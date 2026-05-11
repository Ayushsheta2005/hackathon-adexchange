import type { BidRequest } from "@ade/shared";
/** True iff `bid.bidAmountUsdc` clears `floorUsdc`. */
export declare function clearsFloor(bid: BidRequest, floorUsdc: string): boolean;
/** Runtime sanity: floor cannot be below the hackathon's min tick. */
export declare function assertValidFloor(floorUsdc: string): void;
export declare function filterBidsAboveFloor(bids: readonly BidRequest[], floorUsdc: string): BidRequest[];
//# sourceMappingURL=floor.d.ts.map