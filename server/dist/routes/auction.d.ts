import { Router } from "express";
import type { AutoClearScheduler } from "../auction/autoClearScheduler.js";
import { type RunAuctionDeps } from "../auction/runAuction.js";
import type { ControlStore } from "../state/controlStore.js";
export interface AuctionRunDeps extends RunAuctionDeps {
    autoClearScheduler: AutoClearScheduler;
    controlStore: ControlStore;
}
export declare function createAuctionRouter(deps: AuctionRunDeps): Router;
//# sourceMappingURL=auction.d.ts.map