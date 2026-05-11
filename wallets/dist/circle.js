import { z } from "zod";
import { createRealCircleSdk } from "./circleAdapter.js";
import { loadWalletsConfig } from "./config.js";
import { BalanceSnapshotSchema, TransactionReceiptSchema, TransactionRefSchema, WalletRefSchema, } from "./types.js";
const DEFAULT_WAIT_INTERVAL_MS = 2_000;
const DEFAULT_WAIT_MAX_ATTEMPTS = 30;
export function createCircleClient(args = {}) {
    const config = loadWalletsConfig(args.env);
    const sdk = args.sdk ?? createRealCircleSdk(config);
    const sleep = args.sleep ?? defaultSleep;
    return {
        config,
        async createWalletSet(name) {
            const raw = await sdk.createWalletSet({ name });
            return z.object({ walletSetId: z.string().min(1) }).parse(raw);
        },
        async createWallet(input) {
            const raw = await sdk.createWallet(input);
            return WalletRefSchema.parse(raw);
        },
        async getBalance(walletId) {
            const raw = await sdk.getWalletBalance({ walletId });
            return BalanceSnapshotSchema.parse(raw);
        },
        async listTransactions(walletId) {
            const raw = await sdk.listTransactions({ walletId });
            return z.array(TransactionRefSchema).parse(raw);
        },
        async transfer(input) {
            const raw = await sdk.createTransfer(input);
            return TransactionRefSchema.parse(raw);
        },
        async waitForTx({ transactionId, maxAttempts = DEFAULT_WAIT_MAX_ATTEMPTS, intervalMs = DEFAULT_WAIT_INTERVAL_MS, }) {
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                const raw = await sdk.getTransaction({ transactionId });
                const parsed = TransactionReceiptSchema.parse(raw);
                if (parsed.state === "COMPLETE")
                    return parsed;
                if (parsed.state === "FAILED" ||
                    parsed.state === "CANCELLED" ||
                    parsed.state === "DENIED") {
                    throw new Error(`transaction ${transactionId} ended in ${parsed.state}`);
                }
                if (attempt < maxAttempts)
                    await sleep(intervalMs);
            }
            throw new Error(`waitForTx timeout after ${maxAttempts} attempts (${transactionId})`);
        },
    };
}
/**
 * Test-only adapter stub — every method throws. Exported so integration
 * tests can assert "not wired" paths deliberately.
 */
export function throwingStubSdk() {
    const throwStub = (name) => {
        throw new Error(`CircleSdkAdapter.${name} is a test stub. Inject a real or mocked adapter.`);
    };
    return {
        createWalletSet: () => throwStub("createWalletSet"),
        createWallet: () => throwStub("createWallet"),
        getWalletBalance: () => throwStub("getWalletBalance"),
        listTransactions: () => throwStub("listTransactions"),
        createTransfer: () => throwStub("createTransfer"),
        getTransaction: () => throwStub("getTransaction"),
    };
}
function defaultSleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=circle.js.map