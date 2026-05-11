import { AuctionResultSchema } from "@ade/shared";
import { z } from "zod";
const InputSchema = z.object({
    sellerAgentId: z.string().min(1),
    limit: z.number().int().positive().max(100).default(20),
});
const OutputSchema = z.object({ items: z.array(AuctionResultSchema) });
export function createViewHistoryTool(deps) {
    const fetcher = deps.fetchImpl ?? fetch;
    return {
        name: "viewHistory",
        description: "Fetch the seller's recent auction results. Use to audit settlements rather than guessing at past outcomes.",
        inputSchema: InputSchema,
        outputSchema: OutputSchema,
        async invoke(_input) {
            // TODO(post-scaffold): GET /sellers/:id/auctions?limit=N once that route lands.
            void fetcher;
            return OutputSchema.parse({ items: [] });
        },
    };
}
//# sourceMappingURL=viewHistory.js.map