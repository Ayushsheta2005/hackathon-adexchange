import { Router } from "express";
import type { AutoClearScheduler } from "../auction/autoClearScheduler.js";
import type { ControlStore } from "../state/controlStore.js";
import type { ListingStore } from "../state/stores.js";
export interface InventoryDeps {
    listingStore: ListingStore;
    autoClearScheduler: AutoClearScheduler;
    controlStore: ControlStore;
}
export declare function createInventoryRouter(deps: InventoryDeps): Router;
//# sourceMappingURL=inventory.d.ts.map