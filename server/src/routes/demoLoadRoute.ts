import { randomBytes, randomUUID } from "node:crypto";

import {
  AdInventoryListingSchema,
  BidRequestSchema,
  FLOOR_PRICE_MIN_USDC,
  MAX_CLEARING_PRICE_USDC,
} from "@ade/shared";
import type { CircleClient } from "@ade/wallets";
import { Router } from "express";

import { runAuction } from "../auction/runAuction.js";
import type { EventBus } from "../events/bus.js";
import type { BidStore, ListingStore, SettlementStore } from "../state/stores.js";

const USDC_UNITS = 1_000_000n;

function toAtomic(usdc: string): bigint {
  const [whole = "0", frac = ""] = usdc.split(".");
  const padded = (frac + "000000").slice(0, 6);
  return BigInt(whole) * USDC_UNITS + BigInt(padded);
}

function fromAtomic(atomic: bigint): string {
  const whole = atomic / USDC_UNITS;
  const frac = atomic % USDC_UNITS;
  return `${whole.toString()}.${frac.toString().padStart(6, "0")}`;
}

/**
 * Listing verticals — each biases how the 3 personas bid.
 * All bid amounts are clamped above FLOOR_PRICE_MIN_USDC and below MAX_CLEARING_PRICE_USDC.
 */
const LISTING_TEMPLATES = [
  {
    vertical: "premium-fashion",
    contextTags: ["luxury", "fashion", "premium"] as string[],
    // LuxuryCo dominates (0.085–0.10 USDC), GrowthCo near floor, RetailCo mid
    bias: { "buyer-luxuryco": 0.88, "buyer-growthco": 0.12, "buyer-retailco": 0.50 },
  },
  {
    vertical: "dev-news",
    contextTags: ["tech", "developer", "saas"] as string[],
    // GrowthCo dominates, LuxuryCo near floor, RetailCo mid
    bias: { "buyer-luxuryco": 0.10, "buyer-growthco": 0.85, "buyer-retailco": 0.35 },
  },
  {
    vertical: "retail-checkout",
    contextTags: ["retail", "ecommerce", "checkout-intent"] as string[],
    // RetailCo dominates, both others moderate
    bias: { "buyer-luxuryco": 0.45, "buyer-growthco": 0.30, "buyer-retailco": 0.88 },
  },
  {
    vertical: "general-news",
    contextTags: ["news", "general"] as string[],
    // Tight race — all bid low
    bias: { "buyer-luxuryco": 0.18, "buyer-growthco": 0.15, "buyer-retailco": 0.20 },
  },
] as const;

const PERSONAS = [
  { agentId: "buyer-luxuryco" },
  { agentId: "buyer-growthco" },
  { agentId: "buyer-retailco" },
] as const;

/**
 * Pick a bid amount for a persona given a bias factor (0–1).
 * 0 = just above floor, 1 = MAX_CLEARING_PRICE_USDC.
 * Adds ±10% jitter so identical bias values don't always tie.
 */
function pickBid(bias: number, floorUsdc: string): string {
  const floorAtomic = toAtomic(floorUsdc);
  const capAtomic = toAtomic(MAX_CLEARING_PRICE_USDC);
  const span = capAtomic - floorAtomic;
  // Bias + jitter, clamped to [floor+1unit, cap]
  const jitter = (Math.random() - 0.5) * 0.15; // ±7.5%
  const clamped = Math.max(0, Math.min(1, bias + jitter));
  const val = floorAtomic + BigInt(Math.floor(clamped * Number(span)));
  const safe = val >= floorAtomic + 1n ? val : floorAtomic + 1n;
  return fromAtomic(safe <= capAtomic ? safe : capAtomic);
}

export interface DemoLoadRouteDeps {
  listingStore: ListingStore;
  bidStore: BidStore;
  settlementStore: SettlementStore;
  eventBus: EventBus;
  circleClient: CircleClient | null;
  buyerWalletId: string | undefined;
  buyerWalletRouting?: ReadonlyMap<string, string>;
  sellerWalletAddress: string;
  buyerWalletAddress: string;
}

export function createDemoLoadRouter(deps: DemoLoadRouteDeps): Router {
  const router = Router();

  /**
   * POST /demo/load  { cycles?: number }
   *
   * Runs N complete multi-agent auction cycles entirely in-process:
   *   1. Pick a random listing vertical (fashion / dev / retail / general)
   *   2. Register a fresh listing in the store
   *   3. All 3 personas submit context-aware sealed bids directly into BidStore
   *   4. Second-price auction clears — winner is whoever bid highest for that vertical
   *   5. Circle DCW transfer settles on-chain
   *   6. SSE events (auction.matched, settlement.confirmed) fire in real-time to the UI
   *
   * No terminal required. No payment signing. Returns JSON summary when done.
   */
  router.post("/demo/load", async (req, res, next) => {
    try {
      const cycles: number = Math.min(
        Math.max(1, Number((req.body as { cycles?: number }).cycles ?? 50)),
        100,
      );
      const floor = FLOOR_PRICE_MIN_USDC; // "0.01" USDC

      const completed: Array<{
        cycle: number;
        vertical: string;
        winner: string;
        txHash?: string;
        clearingPrice: string;
        status: string;
      }> = [];
      let totalAtomic = 0n;

      for (let i = 1; i <= cycles; i++) {
        // 1. Pick a random vertical — determines which persona wins
        const tpl = LISTING_TEMPLATES[Math.floor(Math.random() * LISTING_TEMPLATES.length)]!;

        // 2. Register a fresh listing (server removes it after confirmed settlement)
        const listing = AdInventoryListingSchema.parse({
          listingId: randomUUID(),
          sellerAgentId: "seller-agent-sigma",
          sellerWallet: deps.sellerWalletAddress,
          adType: "display",
          format: "banner",
          size: "300x250",
          contextualExclusions: [],
          floorPriceUsdc: floor,
          createdAt: new Date().toISOString(),
        });
        await deps.listingStore.add(listing);

        // 3. Each persona bids based on context-tag affinity for this vertical
        for (const persona of PERSONAS) {
          const bias = tpl.bias[persona.agentId];
          const bidAmount = pickBid(bias, floor);
          const bid = BidRequestSchema.parse({
            bidId: randomUUID(),
            buyerAgentId: persona.agentId,
            buyerWallet: deps.buyerWalletAddress,
            targeting: {
              adType: "display",
              format: "banner",
              size: "300x250",
              contextTags: tpl.contextTags.slice(),
            },
            bidAmountUsdc: bidAmount,
            budgetRemainingUsdc: "1.000000",
            nonce: `0x${randomBytes(32).toString("hex")}`,
            createdAt: new Date().toISOString(),
          });
          await deps.bidStore.add(bid);
          // Note: we do NOT emit "bid.received" — that event does not exist in STREAM_EVENTS.
          // The SSE stream emits auction.matched and settlement.confirmed from runAuction().
        }

        // 4. Clear the auction — second-price engine picks winner, fires SSE events
        const outcome = await runAuction(listing.listingId, {
          listingStore: deps.listingStore,
          bidStore: deps.bidStore,
          settlementStore: deps.settlementStore,
          eventBus: deps.eventBus,
          circleClient: deps.circleClient,
          buyerWalletId: deps.buyerWalletId,
          buyerWalletRouting: deps.buyerWalletRouting,
        });

        if (outcome.kind === "settled") {
          const { auctionResult, receipt } = outcome;
          totalAtomic += toAtomic(auctionResult.clearingPriceUsdc);
          completed.push({
            cycle: i,
            vertical: tpl.vertical,
            winner: auctionResult.winnerBuyerAgentId,
            txHash: receipt.arcTxHash,
            clearingPrice: auctionResult.clearingPriceUsdc,
            status: receipt.status,
          });
        } else {
          // no_eligible_bids should never happen since we just placed 3 bids above floor
          completed.push({
            cycle: i,
            vertical: tpl.vertical,
            winner: "none",
            clearingPrice: "0.000000",
            status: outcome.kind,
          });
        }
      }

      res.json({
        completed: completed.length,
        cycles,
        totalUsdcSettled: fromAtomic(totalAtomic),
        results: completed,
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
