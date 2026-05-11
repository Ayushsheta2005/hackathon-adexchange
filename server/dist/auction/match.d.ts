import type { AdInventoryListing, BidRequest } from "@ade/shared";
/**
 * Match a listing to the subset of bids whose targeting matches the listing's
 * ad type / format / size and none of the listing's contextual exclusions.
 * Pure function — no side effects, no DB writes, no logging.
 */
export declare function matchBidsToListing(listing: AdInventoryListing, bids: readonly BidRequest[]): BidRequest[];
//# sourceMappingURL=match.d.ts.map