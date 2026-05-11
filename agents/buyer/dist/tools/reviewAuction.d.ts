import { AuctionResultSchema } from "@ade/shared";
import { z } from "zod";
import type { AgentTool } from "./types.js";
declare const InputSchema: z.ZodObject<{
    auctionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    auctionId: string;
}, {
    auctionId: string;
}>;
export interface ReviewAuctionDeps {
    exchangeUrl: string;
    fetchImpl?: typeof fetch;
}
export declare function createReviewAuctionTool(deps: ReviewAuctionDeps): AgentTool<z.infer<typeof InputSchema>, z.infer<typeof AuctionResultSchema>>;
export {};
//# sourceMappingURL=reviewAuction.d.ts.map