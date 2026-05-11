import { z } from "zod";
import type { AgentTool } from "./types.js";
declare const InputSchema: z.ZodObject<{
    sellerAgentId: z.ZodString;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sellerAgentId: string;
    limit: number;
}, {
    sellerAgentId: string;
    limit?: number | undefined;
}>;
declare const OutputSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        auctionId: z.ZodString;
        listingId: z.ZodString;
        winningBidId: z.ZodString;
        winnerBuyerAgentId: z.ZodString;
        winnerBuyerWallet: z.ZodString;
        sellerAgentId: z.ZodString;
        sellerWallet: z.ZodString;
        winningBidUsdc: z.ZodString;
        clearingPriceUsdc: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }, {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }[];
}, {
    items: {
        listingId: string;
        sellerAgentId: string;
        sellerWallet: string;
        createdAt: string;
        auctionId: string;
        winningBidId: string;
        winnerBuyerAgentId: string;
        winnerBuyerWallet: string;
        winningBidUsdc: string;
        clearingPriceUsdc: string;
    }[];
}>;
export interface ViewHistoryDeps {
    exchangeUrl: string;
    fetchImpl?: typeof fetch;
}
export declare function createViewHistoryTool(deps: ViewHistoryDeps): AgentTool<z.infer<typeof InputSchema>, z.infer<typeof OutputSchema>>;
export {};
//# sourceMappingURL=viewHistory.d.ts.map