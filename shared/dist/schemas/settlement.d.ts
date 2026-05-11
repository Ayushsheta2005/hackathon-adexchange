import { z } from "zod";
export declare const SettlementStatusSchema: z.ZodEnum<["pending", "confirmed", "failed"]>;
export type SettlementStatus = z.infer<typeof SettlementStatusSchema>;
export declare const SettlementReceiptSchema: z.ZodObject<{
    receiptId: z.ZodString;
    auctionId: z.ZodString;
    buyerWallet: z.ZodString;
    sellerWallet: z.ZodString;
    gatewayContract: z.ZodString;
    amountUsdc: z.ZodString;
    eip3009Nonce: z.ZodString;
    status: z.ZodEnum<["pending", "confirmed", "failed"]>;
    arcTxHash: z.ZodOptional<z.ZodString>;
    arcLogIndex: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodString;
    confirmedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "confirmed" | "failed";
    sellerWallet: string;
    createdAt: string;
    buyerWallet: string;
    auctionId: string;
    receiptId: string;
    gatewayContract: string;
    amountUsdc: string;
    eip3009Nonce: string;
    arcTxHash?: string | undefined;
    arcLogIndex?: number | undefined;
    confirmedAt?: string | undefined;
}, {
    status: "pending" | "confirmed" | "failed";
    sellerWallet: string;
    createdAt: string;
    buyerWallet: string;
    auctionId: string;
    receiptId: string;
    gatewayContract: string;
    amountUsdc: string;
    eip3009Nonce: string;
    arcTxHash?: string | undefined;
    arcLogIndex?: number | undefined;
    confirmedAt?: string | undefined;
}>;
export type SettlementReceipt = z.infer<typeof SettlementReceiptSchema>;
//# sourceMappingURL=settlement.d.ts.map