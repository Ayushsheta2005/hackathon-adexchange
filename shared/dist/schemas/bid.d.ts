import { z } from "zod";
export declare const BidRequestSchema: z.ZodObject<{
    bidId: z.ZodString;
    buyerAgentId: z.ZodString;
    buyerWallet: z.ZodString;
    targeting: z.ZodObject<{
        adType: z.ZodEnum<["display", "video", "native"]>;
        format: z.ZodString;
        size: z.ZodString;
        contextTags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        adType: "display" | "video" | "native";
        format: string;
        size: string;
        contextTags: string[];
    }, {
        adType: "display" | "video" | "native";
        format: string;
        size: string;
        contextTags?: string[] | undefined;
    }>;
    bidAmountUsdc: z.ZodString;
    budgetRemainingUsdc: z.ZodString;
    nonce: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    bidId: string;
    buyerAgentId: string;
    buyerWallet: string;
    targeting: {
        adType: "display" | "video" | "native";
        format: string;
        size: string;
        contextTags: string[];
    };
    bidAmountUsdc: string;
    budgetRemainingUsdc: string;
    nonce: string;
}, {
    createdAt: string;
    bidId: string;
    buyerAgentId: string;
    buyerWallet: string;
    targeting: {
        adType: "display" | "video" | "native";
        format: string;
        size: string;
        contextTags?: string[] | undefined;
    };
    bidAmountUsdc: string;
    budgetRemainingUsdc: string;
    nonce: string;
}>;
export type BidRequest = z.infer<typeof BidRequestSchema>;
//# sourceMappingURL=bid.d.ts.map