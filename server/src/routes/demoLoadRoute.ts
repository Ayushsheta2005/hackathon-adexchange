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

/** Context-aware listing templates — different verticals trigger different persona bidding behavior */
const LISTING_TEMPLATES = [
  {
    vertical: "premium-fashion",
    contextTags: ["luxury", "fashion", "premium"],
    // LuxuryCo loves this — bids near max. GrowthCo ignores. RetailCo mid.
    biasFn: (agentId: string) => {
      if (agentId === "buyer-luxuryco") return 0.85 + Math.random() * 0.15; // 0.85–1.0 of max range
      if (agentId === "buyer-growthco") return 0.05 + Math.random() * 0.10; // near floor
      return 0.40 + Math.random() * 0.25; // mid
    },
  },
  {
    vertical: "dev-news",
    contextTags: ["tech", "developer", "saas"],
    // GrowthCo loves this — LuxuryCo pulls back hard.
    biasFn: (agentId: string) => {
      if (agentId === "buyer-growthco") return 0.80 + Math.random() * 0.20;
      if (agentId === "buyer-luxuryco") return 0.05 + Math.random() * 0.10;
      return 0.30 + Math.random() * 0.20;
    },
  },
  {
    vertical: "retail-checkout",
    contextTags: ["retail", "ecommerce", "checkout-intent"],
    // RetailCo loves this — both others are moderate.
    biasFn: (agentId: string) => {
      if (agentId === "buyer-retailco") return 0.80 + Math.random() * 0.20;
      if (agentId === "buyer-growthco") return 0.30 + Math.random() * 0.20;
      return 0.50 + Math.random() * 0.20;
    },
  },
  {
    vertical: "general-news",
    contextTags: ["news", "general"],
    // Nobody excited — all bid low, tight race near floor.
    biasFn: (_agentId: string) => 0.05 + Math.random() * 0.20,
  },
] as const;

/** Per-persona bid ranges */
const PERSONAS = [
  { agentId: "buyer-luxuryco", minUsdc: "0.003", maxUsdc: "0.009" },
  { agentId: "buyer-growthco", minUsdc: "0.002", maxUsdc: "0.005" },
  { agentId: "buyer-retailco", minUsdc: "0.002", maxUsdc: "0.008" },
] as const;

function pickPersonaBid(agentId: string, floorUsdc: string, bias: number): string {
  const persona = PERSONAS.find((p) => p.agentId === agentId);
  if (!persona) return floorUsdc;

  const minAtomic = toAtomic(persona.minUsdc);
  const maxAtomic = toAtomic(persona.maxUsdc);
  const capAtomic = toAtomic(MAX_CLEARING_PRICE_USDC);
  const floorAtomic = toAtomic(floorUsdc);

  const effectiveMin = minAtomic > floorAtomic ? minAtomic : floorAtomic + toAtomic("0.000001");
  const effectiveMax = maxAtomic < capAtomic ? maxAtomic : capAtomic;
  if (effectiveMin >= effectiveMax) return fromAtomic(effectiveMax);

  const span = effectiveMax - effectiveMin;
  const biasedAtomic = effectiveMin + BigInt(Math.floor(bias * Number(span)));
  return fromAtomic(biasedAtomic < effectiveMax ? biasedAtomic : effectiveMax);
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
   * POST /demo/load
   * Runs N complete multi-agent auction cycles. Each cycle:
   *   1. Picks a random listing vertical (fashion / dev / retail / general)
   *   2. Has all 3 buyer personas place context-aware bids simultaneously
   *   3. Clears a second-price auction — winner varies by vertical
   *   4. Settles on-chain via Circle DCW
   *
   * Returns when all cycles complete. The UI receives live SSE events
   * (bid.received, auction.matched, settlement.confirmed) throughout.
   */
  router.post("/demo/load", async (req, res, next) => {
    try {
      const cycles: number = Math.min(
        Math.max(1, Number((req.body as { cycles?: number }).cycles ?? 50)),
        100,
      );
      const floor = FLOOR_PRICE_MIN_USDC;

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
        // 1. Pick a random listing vertical for this cycle
        const tpl = LISTING_TEMPLATES[Math.floor(Math.random() * LISTING_TEMPLATES.length)]!;

        // 2. Register a fresh listing
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

        // 3. All 3 personas place bids based on listing context
        for (const persona of PERSONAS) {
          const bias = tpl.biasFn(persona.agentId);
          const bidAmount = pickPersonaBid(persona.agentId, floor, bias);
          const bid = BidRequestSchema.parse({
            bidId: randomUUID(),
            buyerAgentId: persona.agentId,
            buyerWallet: deps.buyerWalletAddress,
            targeting: {
              adType: "display",
              format: "banner",
              size: "300x250",
              contextTags: tpl.contextTags.filter(() => Math.random() > 0.3),
            },
            bidAmountUsdc: bidAmount,
            budgetRemainingUsdc: "1.000000",
            nonce: `0x${randomBytes(32).toString("hex")}`,
            createdAt: new Date().toISOString(),
          });
          await deps.bidStore.add(bid);
          deps.eventBus.emit("bid.received", bid);
        }

        // 4. Clear the auction — second-price winner emerges
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
          completed.push({ cycle: i, vertical: tpl.vertical, winner: "none", clearingPrice: "0", status: outcome.kind });
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
