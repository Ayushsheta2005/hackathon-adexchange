import { AuctionResultSchema } from "@ade/shared";
import { z } from "zod";
const InputSchema = z.object({ auctionId: z.string().uuid() });
export function createReviewAuctionTool(deps) {
    const fetcher = deps.fetchImpl ?? fetch;
    return {
        name: "reviewAuction",
        description: "Fetch a prior auction result from the Exchange. Use to confirm win/loss, clearing price, and seller for a given auctionId.",
        inputSchema: InputSchema,
        outputSchema: AuctionResultSchema,
        async invoke(input) {
            const res = await fetcher(`${deps.exchangeUrl}/auctions/${input.auctionId}`, {
                method: "GET",
            });
            if (!res.ok)
                throw new Error(`reviewAuction: ${res.status}`);
            const json = (await res.json());
            return AuctionResultSchema.parse(json);
        },
    };
}
//# sourceMappingURL=reviewAuction.js.map