import { UsdcAmountSchema, WalletAddressSchema } from "@ade/shared";
import { z } from "zod";
export const WalletRefSchema = z.object({
    walletId: z.string().min(1),
    address: WalletAddressSchema,
    blockchain: z.string().min(1),
});
export const BalanceSnapshotSchema = z.object({
    walletId: z.string().min(1),
    usdc: UsdcAmountSchema,
    asOf: z.string().datetime({ offset: true }),
});
export const TransactionRefSchema = z.object({
    transactionId: z.string().min(1),
    txHash: z
        .string()
        .regex(/^0x[a-fA-F0-9]{64}$/)
        .optional(),
    status: z.enum(["queued", "sent", "confirmed", "failed"]),
});
/**
 * Circle DCW transaction state enum — superset of the values the SDK returns.
 * Reason: the SDK exports all 10 states (CANCELLED, CONFIRMED, COMPLETE,
 * DENIED, FAILED, INITIATED, CLEARED, QUEUED, SENT, STUCK); a tighter enum
 * would fail zod parse on the long-tail states and blow up polling loops.
 */
export const TransactionStateSchema = z.enum([
    "QUEUED",
    "INITIATED",
    "SENT",
    "CONFIRMED",
    "CLEARED",
    "COMPLETE",
    "FAILED",
    "CANCELLED",
    "DENIED",
    "STUCK",
]);
export const TransactionReceiptSchema = z.object({
    transactionId: z.string().min(1),
    txHash: z
        .string()
        .regex(/^0x[a-fA-F0-9]{64}$/)
        .optional(),
    state: TransactionStateSchema,
    blockchain: z.string().min(1).optional(),
});
//# sourceMappingURL=types.js.map