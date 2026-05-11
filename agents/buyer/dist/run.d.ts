import type { BuyerAgent } from "./agent.js";
import { type BuyerAgentConfig } from "./config.js";
export interface RunBuyerDeps {
    /** Override env-loaded config (tests). */
    config?: BuyerAgentConfig;
    /** Fetch override (tests). */
    fetchImpl?: typeof fetch;
    /** Inject a pre-built agent (tests); production builds via Gemini. */
    agent?: BuyerAgent;
    /** Bound the loop to N cycles. Tests pass a number; production omits. */
    maxCycles?: number;
    /** Sleep override (tests skip the wait). */
    sleepImpl?: (ms: number) => Promise<void>;
    /** Structured logger hook. Defaults to console.log with persona prefix. */
    log?: (msg: string, meta?: Record<string, unknown>) => void;
}
export interface RunBuyerResult {
    cycles: number;
    bids: number;
}
export declare function runBuyer(deps?: RunBuyerDeps): Promise<RunBuyerResult>;
//# sourceMappingURL=run.d.ts.map