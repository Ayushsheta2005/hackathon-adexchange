import type { SellerAgent } from "./agent.js";
import { type SellerAgentConfig } from "./config.js";
export interface RunSellerDeps {
    /** Override env-loaded config (tests). */
    config?: SellerAgentConfig;
    /** Inject a pre-built agent (tests); production builds via Gemini. */
    agent?: SellerAgent;
    /** Bound the loop to N cycles. Tests pass a number; production omits. */
    maxCycles?: number;
    /** Sleep override (tests skip the wait). */
    sleepImpl?: (ms: number) => Promise<void>;
    /** Structured logger hook. */
    log?: (msg: string, meta?: Record<string, unknown>) => void;
    /** Capture the prompt sent to the agent each cycle (tests). */
    onPrompt?: (prompt: string) => void;
    /** Fetch override for the /control/state pause check (tests). */
    fetchImpl?: typeof fetch;
}
export interface RunSellerResult {
    cycles: number;
    registered: number;
}
export declare function runSeller(deps?: RunSellerDeps): Promise<RunSellerResult>;
//# sourceMappingURL=run.d.ts.map