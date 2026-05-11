import { Router } from "express";
import type { GatewayMiddlewareAdapter } from "../middleware/nanopayments.js";
import type { NonceStore } from "../nonces/store.js";
import type { ControlStore } from "../state/controlStore.js";
import type { BidStore } from "../state/stores.js";
export interface BidDeps {
    bidStore: BidStore;
    nonceStore: NonceStore;
    rateLimitPerMin: number;
    /** When present, POST /bid requires a sub-cent x402 nanopayment. */
    gateway?: GatewayMiddlewareAdapter;
    controlStore: ControlStore;
}
export declare function createBidRouter(deps: BidDeps): Router;
//# sourceMappingURL=bid.d.ts.map