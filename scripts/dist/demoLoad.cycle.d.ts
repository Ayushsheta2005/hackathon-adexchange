export interface RunDemoCycleDeps {
    exchangeApiUrl: string;
    listingId: string;
    buyerAgentId?: string;
    buyerAddress: string;
    floorUsdc: string;
    /** Injectable RNG; returns `[0, 1)`. Defaults to Math.random. */
    rand?: () => number;
}
export interface DemoCycleResult {
    bidAmount: string;
    clearingPrice: string;
    auctionId: string;
    txHash: string;
    explorerUrl: string;
    status: string;
}
/**
 * Run one buyer→seller nanopayment cycle via the Exchange HTTP API.
 * POSTs a bid, then triggers the server-side second-price auction which
 * handles settlement and emits SSE events for the live dashboard.
 */
export declare function runDemoCycle(deps: RunDemoCycleDeps): Promise<DemoCycleResult>;
/**
 * Pick a bid in the half-open range `[floor + tick, MAX_CLEARING_PRICE_USDC]`.
 * If `floor + tick` exceeds the cap, clamp to the cap so the bid still
 * passes the floor filter — keeps the demo deterministic near the ceiling.
 */
export declare function pickBidAmount(floorUsdc: string, rand: () => number): string;
//# sourceMappingURL=demoLoad.cycle.d.ts.map