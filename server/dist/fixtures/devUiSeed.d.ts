import type { AdInventoryListing, AuctionResult, BidRequest, SettlementReceipt } from "@ade/shared";
import type { Logger } from "pino";
import type { BidStore, ListingStore, SettlementStore } from "../state/stores.js";
export declare const FIXTURE_LISTING_A = "11111111-1111-4111-8111-111111111101";
export declare const FIXTURE_LISTING_B = "11111111-1111-4111-8111-111111111102";
export declare function buildFixtureListings(): AdInventoryListing[];
export declare function buildFixtureBids(): BidRequest[];
/** Synthetic past auctions replayed over SSE so the feed populates on connect. */
export declare function buildFixtureAuctionReplay(): AuctionResult[];
export declare function buildFixtureReceipts(auctions: readonly AuctionResult[]): SettlementReceipt[];
export interface SeedDevUiStoresInput {
    listingStore: ListingStore;
    bidStore: BidStore;
    settlementStore: SettlementStore;
    logger?: Logger;
}
/**
 * Loads deterministic listings, bids, and confirmed receipts into the in-memory
 * stores. Does not emit SSE (auction feed uses `fixtureAuctionReplay` in the
 * stream handshake so settlement counters stay aligned with GET /settlements).
 */
export declare function seedDevUiStores(input: SeedDevUiStoresInput): Promise<void>;
//# sourceMappingURL=devUiSeed.d.ts.map