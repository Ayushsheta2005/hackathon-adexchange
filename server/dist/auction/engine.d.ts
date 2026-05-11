import type { BidRequest } from "@ade/shared";
export interface AuctionInput {
    bids: readonly BidRequest[];
    floorUsdc: string;
}
export interface AuctionOutput {
    winner: BidRequest;
    /** Second-price + 1 tick, capped at the winner's bid and at MAX_CLEARING_PRICE_USDC. */
    clearingPriceUsdc: string;
    /** Bids that cleared the floor, sorted descending by bid amount, ties by earliest createdAt. */
    rankedBids: BidRequest[];
}
/**
 * Second-price sealed-bid auction with a configurable tick.
 *
 * Rules (from agentic-ad-exchange-stack.md § The Exchange + PRP blueprint):
 *   1. Drop bids below `floorUsdc`.
 *   2. 0 bids  → null.
 *   3. 1 bid   → winner pays `floor + NANOPAYMENT_UNIT_USDC`.
 *   4. ≥ 2     → sort desc by bid; ties broken by earliest `createdAt`.
 *                clearing = min(winner.bid, secondHighest.bid + tick).
 *   5. Always cap clearing at MAX_CLEARING_PRICE_USDC — hackathon invariant.
 *
 * All math goes through the BigInt helpers in `./money.ts`. No floats.
 */
export declare function runSecondPriceAuction(input: AuctionInput): AuctionOutput | null;
//# sourceMappingURL=engine.d.ts.map