import { type CircleClient } from "@ade/wallets";
import { type ScriptsConfig } from "./config.js";
import { type DemoCycleResult } from "./demoLoad.cycle.js";
/**
 * One row of the manifest written to `scripts/.demo-output/settlements.json`.
 * Producer (writeSettlementManifest) and consumer (judges, the demo video
 * narration) are both inside this repo — a zod schema would be overkill.
 */
export interface SettlementManifestEntry {
    cycle: number;
    txHash: string;
    explorerUrl: string;
    clearingPrice: string;
    status: string;
}
export interface DemoLoadDeps {
    config?: ScriptsConfig;
    /** Used only for the preflight balance check; the cycle itself goes through HTTP. */
    client?: CircleClient;
    floorUsdc?: string;
    rand?: () => number;
    logLine?: (msg: string, meta?: Record<string, unknown>) => void;
    /**
     * Override the manifest writer for tests. Defaults to writing to
     * `scripts/.demo-output/settlements.json`. Tests inject a spy so they
     * don't have to mock node:fs.
     */
    writeManifest?: (results: DemoCycleResult[]) => Promise<void>;
}
export interface DemoLoadResult {
    cycles: number;
    totalUsdcSettled: string;
    results: DemoCycleResult[];
}
export declare function runDemoLoad(deps?: DemoLoadDeps): Promise<DemoLoadResult>;
//# sourceMappingURL=demoLoad.d.ts.map