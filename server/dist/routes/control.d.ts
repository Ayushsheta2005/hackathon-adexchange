import { Router } from "express";
import type { EventBus } from "../events/bus.js";
import type { ControlStore } from "../state/controlStore.js";
export interface ControlDeps {
    controlStore: ControlStore;
    eventBus: EventBus;
}
export declare function createControlRouter(deps: ControlDeps): Router;
//# sourceMappingURL=control.d.ts.map