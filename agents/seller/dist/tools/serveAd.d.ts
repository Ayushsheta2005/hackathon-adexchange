import { z } from "zod";
import type { AgentTool } from "./types.js";
declare const InputSchema: z.ZodObject<{
    auctionId: z.ZodString;
    creativeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    auctionId: string;
    creativeId: string;
}, {
    auctionId: string;
    creativeId: string;
}>;
declare const OutputSchema: z.ZodObject<{
    served: z.ZodBoolean;
    servedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    served: boolean;
    servedAt: string;
}, {
    served: boolean;
    servedAt: string;
}>;
export interface ServeAdDeps {
    exchangeUrl: string;
    fetchImpl?: typeof fetch;
}
export declare function createServeAdTool(deps: ServeAdDeps): AgentTool<z.infer<typeof InputSchema>, z.infer<typeof OutputSchema>>;
export {};
//# sourceMappingURL=serveAd.d.ts.map