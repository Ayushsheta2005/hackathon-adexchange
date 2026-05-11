import { z } from "zod";
export declare const AuctionResultSchema: z.ZodObject<{
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
}>;
export type AuctionResult = z.infer<typeof AuctionResultSchema>;
//# sourceMappingURL=auction.d.ts.map