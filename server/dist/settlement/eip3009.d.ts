import { z } from "zod";
import type { NonceStore } from "../nonces/store.js";
/**
 * EIP-3009 (TransferWithAuthorization) typed-data builder.
 *
 * We only construct the EIP-712 payload here; signing is a separate concern
 * held by wallets/ (or, later, Circle's signer). This keeps the server free
 * of any private-key material and matches PLANNING.md § Trust Model.
 *
 * Callers must pass `chainId: config.ARC_CHAIN_ID` (defaults to `ARC_TESTNET_CHAIN_ID`
 * from `@ade/shared`) and `verifyingContract: ARC_TESTNET_USDC` (not Gateway).
 * Signing is a separate concern in wallets/ — this module stays key-free.
 */
export declare const AuthorizationArgsSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
    valueUsdcAtomic: z.ZodString;
    validAfter: z.ZodNumber;
    validBefore: z.ZodNumber;
    nonce: z.ZodString;
    chainId: z.ZodNumber;
    verifyingContract: z.ZodString;
}, "strip", z.ZodTypeAny, {
    nonce: string;
    from: string;
    to: string;
    chainId: number;
    valueUsdcAtomic: string;
    validAfter: number;
    validBefore: number;
    verifyingContract: string;
}, {
    nonce: string;
    from: string;
    to: string;
    chainId: number;
    valueUsdcAtomic: string;
    validAfter: number;
    validBefore: number;
    verifyingContract: string;
}>;
export type AuthorizationArgs = z.infer<typeof AuthorizationArgsSchema>;
export interface Eip3009TypedData {
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    };
    primaryType: "TransferWithAuthorization";
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        TransferWithAuthorization: {
            name: string;
            type: string;
        }[];
    };
    message: {
        from: string;
        to: string;
        value: string;
        validAfter: number;
        validBefore: number;
        nonce: string;
    };
}
/**
 * Build the EIP-712 typed-data object for a USDC TransferWithAuthorization
 * per the EIP-3009 spec (https://eips.ethereum.org/EIPS/eip-3009).
 *
 * The shape is deterministic: same args → exact same output. That makes
 * `buildTypedData` easy to test without a private key.
 */
export declare function buildTypedData(args: AuthorizationArgs): Eip3009TypedData;
/**
 * Reserve a nonce before accepting an authorization.
 * Returns false if the nonce was already claimed (replay).
 */
export declare function reserveNonce(store: NonceStore, depositor: string, nonce: string): Promise<boolean>;
/** The Gateway Wallet contract — the on-chain `from` at settlement time. */
export declare const GATEWAY_CONTRACT: "0x0077777d7EBA4688BDeF3E311b846F25870A19B9";
//# sourceMappingURL=eip3009.d.ts.map