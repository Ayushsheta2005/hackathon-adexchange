import type { ListingStore } from "../state/stores.js";
/**
 * In-server orchestrator that drives one full multi-agent auction cycle:
 * seller agent registers a listing → N buyer agents bid in parallel → auction
 * clears via second-price → settlement transfer is dispatched to the winner's
 * Circle DCW (via the auction route's address-keyed wallet routing).
 */
export interface PersonaTemplate {
    agentId: string;
    brand: string;
    strategy: string;
    maxBid: string;
    minBid: string;
    preferredTags: ReadonlyArray<string>;
    walletIdEnvKey: string;
    walletAddressEnvKey: string;
}
export declare const PERSONA_TEMPLATES: ReadonlyArray<PersonaTemplate>;
export interface ResolvedPersona {
    agentId: string;
    brand: string;
    strategy: string;
    maxBid: string;
    minBid: string;
    preferredTags: ReadonlyArray<string>;
    walletId: string;
    walletAddress: string;
}
export declare function resolvePersonasFromEnv(env: NodeJS.ProcessEnv): ResolvedPersona[];
export interface BidLog {
    agentId: string;
    bidId: string;
    output: string;
    iterations: number;
    toolCalls: ReadonlyArray<string>;
    placed: boolean;
}
export interface AgentAuctionResult {
    listingId: string;
    listingVertical: string;
    listingTags: ReadonlyArray<string>;
    floorUsdc: string;
    sellerOutput: string;
    bids: BidLog[];
    winner?: {
        agentId: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    };
    settlement?: {
        status: string;
        arcTxHash?: string;
    };
}
export interface AgentAuctionDeps {
    exchangeUrl: string;
    /**
     * Source of existing inventory. The orchestrator picks the oldest unsold
     * listing from this store; it does not create new listings.
     */
    listingStore: ListingStore;
    personas: ResolvedPersona[];
    gemini: {
        apiKey: string;
        model: string;
    };
    /**
     * Shared EOA private key used to sign x402 payment authorizations for every
     * persona's bid. Optional: when absent, bids fall through to plain fetch and
     * will be 402'd by the gateway middleware on /bid.
     */
    buyerPrivateKey?: `0x${string}`;
    rng?: () => number;
}
export declare function runAgentAuction(deps: AgentAuctionDeps): Promise<AgentAuctionResult>;
//# sourceMappingURL=runAgentAuction.d.ts.map