import { z } from "zod";
import type { AgentTool } from "./types.js";
declare const InputSchema: z.ZodObject<{
    walletId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    walletId: string;
}, {
    walletId: string;
}>;
declare const OutputSchema: z.ZodObject<{
    walletId: z.ZodString;
    usdc: z.ZodString;
    asOf: z.ZodString;
}, "strip", z.ZodTypeAny, {
    walletId: string;
    usdc: string;
    asOf: string;
}, {
    walletId: string;
    usdc: string;
    asOf: string;
}>;
export interface CheckBalanceDeps {
    exchangeUrl: string;
    fetchImpl?: typeof fetch;
}
export declare function createCheckBalanceTool(deps: CheckBalanceDeps): AgentTool<z.infer<typeof InputSchema>, z.infer<typeof OutputSchema>>;
export {};
//# sourceMappingURL=checkBalance.d.ts.map