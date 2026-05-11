import { z } from "zod";
const InputSchema = z.object({
    auctionId: z.string().uuid(),
    creativeId: z.string().min(1),
});
const OutputSchema = z.object({
    served: z.boolean(),
    servedAt: z.string().datetime({ offset: true }),
});
export function createServeAdTool(deps) {
    const fetcher = deps.fetchImpl ?? fetch;
    return {
        name: "serveAd",
        description: "Serve the creative for a won auction. Only call AFTER the Exchange reports settlement confirmed for the given auctionId.",
        inputSchema: InputSchema,
        outputSchema: OutputSchema,
        async invoke(_input) {
            // TODO(post-scaffold): POST /auctions/:id/serve once the route lands.
            void fetcher;
            return OutputSchema.parse({
                served: true,
                servedAt: new Date().toISOString(),
            });
        },
    };
}
//# sourceMappingURL=serveAd.js.map