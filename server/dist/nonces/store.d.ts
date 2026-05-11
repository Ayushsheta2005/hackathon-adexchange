/**
 * EIP-3009 nonce store. Each (depositor, nonce) pair must be unique — a
 * duplicate signature would be a replay. In-memory scaffold; later PRPs
 * swap the implementation (SQLite, Postgres) without changing the interface.
 */
export interface NonceStore {
    /**
     * Claim a nonce atomically. Returns true if newly claimed, false if already seen.
     */
    claim(depositor: string, nonce: string): Promise<boolean>;
    has(depositor: string, nonce: string): Promise<boolean>;
    size(): Promise<number>;
}
export declare function createInMemoryNonceStore(): NonceStore;
//# sourceMappingURL=store.d.ts.map