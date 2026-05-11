import { Router } from "express";
import type { SettlementStore } from "../state/stores.js";
export interface SettlementDeps {
    settlementStore: SettlementStore;
}
export declare function createSettlementRouter(deps: SettlementDeps): Router;
//# sourceMappingURL=settlements.d.ts.map