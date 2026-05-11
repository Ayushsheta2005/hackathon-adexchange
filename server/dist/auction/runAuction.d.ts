import { type AuctionResult, type SettlementReceipt } from "@ade/shared";
import type { CircleClient } from "@ade/wallets";
import type { EventBus } from "../events/bus.js";
import type { BidStore, ListingStore, SettlementStore } from "../state/stores.js";
export interface RunAuctionDeps {
    listingStore: ListingStore;
    bidStore: BidStore;
    settlementStore: SettlementStore;
    eventBus: EventBus;
    /** null when Circle is not configured — settlement receipt is stored as "failed". */
    circleClient: CircleClient | null;
    buyerWalletId: string | undefined;
    /** Lowercased winner-address → walletId. Falls back to buyerWalletId if no match. */
    buyerWalletRouting?: ReadonlyMap<string, string>;
}
export type RunAuctionOutcome = {
    kind: "listing_not_found";
} | {
    kind: "no_eligible_bids";
} | {
    kind: "settled";
    auctionResult: AuctionResult;
    receipt: SettlementReceipt;
};
/**
 * Clear an auction for a single listing. Pure logic — no HTTP. Called from
 * both the manual route handler and the auto-clear scheduler.
 */
export declare function runAuction(listingId: string, deps: RunAuctionDeps): Promise<RunAuctionOutcome>;
//# sourceMappingURL=runAuction.d.ts.map