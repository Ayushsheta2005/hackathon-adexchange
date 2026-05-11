import { z } from "zod";
export declare const WalletRefSchema: z.ZodObject<{
    walletId: z.ZodString;
    address: z.ZodString;
    blockchain: z.ZodString;
}, "strip", z.ZodTypeAny, {
    blockchain: string;
    address: string;
    walletId: string;
}, {
    blockchain: string;
    address: string;
    walletId: string;
}>;
export type WalletRef = z.infer<typeof WalletRefSchema>;
export declare const BalanceSnapshotSchema: z.ZodObject<{
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
export type BalanceSnapshot = z.infer<typeof BalanceSnapshotSchema>;
export declare const TransactionRefSchema: z.ZodObject<{
    transactionId: z.ZodString;
    txHash: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["queued", "sent", "confirmed", "failed"]>;
}, "strip", z.ZodTypeAny, {
    status: "confirmed" | "failed" | "queued" | "sent";
    transactionId: string;
    txHash?: string | undefined;
}, {
    status: "confirmed" | "failed" | "queued" | "sent";
    transactionId: string;
    txHash?: string | undefined;
}>;
export type TransactionRef = z.infer<typeof TransactionRefSchema>;
/**
 * Circle DCW transaction state enum — superset of the values the SDK returns.
 * Reason: the SDK exports all 10 states (CANCELLED, CONFIRMED, COMPLETE,
 * DENIED, FAILED, INITIATED, CLEARED, QUEUED, SENT, STUCK); a tighter enum
 * would fail zod parse on the long-tail states and blow up polling loops.
 */
export declare const TransactionStateSchema: z.ZodEnum<["QUEUED", "INITIATED", "SENT", "CONFIRMED", "CLEARED", "COMPLETE", "FAILED", "CANCELLED", "DENIED", "STUCK"]>;
export type TransactionState = z.infer<typeof TransactionStateSchema>;
export declare const TransactionReceiptSchema: z.ZodObject<{
    transactionId: z.ZodString;
    txHash: z.ZodOptional<z.ZodString>;
    state: z.ZodEnum<["QUEUED", "INITIATED", "SENT", "CONFIRMED", "CLEARED", "COMPLETE", "FAILED", "CANCELLED", "DENIED", "STUCK"]>;
    blockchain: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    transactionId: string;
    state: "CANCELLED" | "CONFIRMED" | "COMPLETE" | "DENIED" | "FAILED" | "INITIATED" | "CLEARED" | "QUEUED" | "SENT" | "STUCK";
    blockchain?: string | undefined;
    txHash?: string | undefined;
}, {
    transactionId: string;
    state: "CANCELLED" | "CONFIRMED" | "COMPLETE" | "DENIED" | "FAILED" | "INITIATED" | "CLEARED" | "QUEUED" | "SENT" | "STUCK";
    blockchain?: string | undefined;
    txHash?: string | undefined;
}>;
export type TransactionReceipt = z.infer<typeof TransactionReceiptSchema>;
//# sourceMappingURL=types.d.ts.map