import { type WalletsConfig } from "./config.js";
import { type BalanceSnapshot, type TransactionReceipt, type TransactionRef, type WalletRef } from "./types.js";
/**
 * Typed surface over Circle Developer-Controlled Wallets. Every method runs
 * its SDK response through a zod schema before returning — callers never
 * touch the raw SDK shape.
 */
export interface CircleClient {
    readonly config: Readonly<WalletsConfig>;
    createWalletSet(name: string): Promise<{
        walletSetId: string;
    }>;
    createWallet(input: {
        walletSetId: string;
        blockchain: string;
    }): Promise<WalletRef>;
    getBalance(walletId: string): Promise<BalanceSnapshot>;
    listTransactions(walletId: string): Promise<TransactionRef[]>;
    transfer(input: {
        walletId: string;
        destinationAddress: string;
        amountUsdc: string;
    }): Promise<TransactionRef>;
    waitForTx(input: {
        transactionId: string;
        maxAttempts?: number;
        intervalMs?: number;
    }): Promise<TransactionReceipt>;
}
/**
 * Thin adapter shape — the only place Circle SDK method signatures live.
 * Tests mock this boundary so business logic stays decoupled from the SDK.
 */
export interface CircleSdkAdapter {
    createWalletSet(args: {
        name: string;
    }): Promise<unknown>;
    createWallet(args: {
        walletSetId: string;
        blockchain: string;
    }): Promise<unknown>;
    getWalletBalance(args: {
        walletId: string;
    }): Promise<unknown>;
    listTransactions(args: {
        walletId: string;
    }): Promise<unknown>;
    createTransfer(args: {
        walletId: string;
        destinationAddress: string;
        amountUsdc: string;
    }): Promise<unknown>;
    getTransaction(args: {
        transactionId: string;
    }): Promise<unknown>;
}
export interface CreateCircleClientArgs {
    env?: NodeJS.ProcessEnv;
    /** Inject a mock SDK in tests. Defaults to the real Circle-SDK-backed adapter. */
    sdk?: CircleSdkAdapter;
    /** Inject a sleep function for deterministic polling in tests. Defaults to setTimeout. */
    sleep?: (ms: number) => Promise<void>;
}
export declare function createCircleClient(args?: CreateCircleClientArgs): CircleClient;
/**
 * Test-only adapter stub — every method throws. Exported so integration
 * tests can assert "not wired" paths deliberately.
 */
export declare function throwingStubSdk(): CircleSdkAdapter;
//# sourceMappingURL=circle.d.ts.map