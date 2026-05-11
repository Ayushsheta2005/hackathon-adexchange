import { Router } from "express";
import { type ResolvedPersona } from "../demo/runAgentAuction.js";
import type { ListingStore } from "../state/stores.js";
export interface DemoDeps {
    exchangeUrl: string;
    listingStore: ListingStore;
    personas: ResolvedPersona[];
    gemini?: {
        apiKey: string;
        model: string;
    };
    buyerPrivateKey?: `0x${string}`;
}
export declare function createDemoRouter(deps: DemoDeps): Router;
//# sourceMappingURL=demo.d.ts.map