import { z } from "zod";
/**
 * Single reader of process.env for @ade/scripts. Scripts inherit the same
 * Circle env as @ade/wallets but add deposit/faucet-specific keys.
 */
declare const ScriptsEnvSchema: z.ZodObject<{
    CIRCLE_API_KEY: z.ZodString;
    CIRCLE_ENTITY_SECRET: z.ZodString;
    CIRCLE_ENVIRONMENT: z.ZodDefault<z.ZodEnum<["testnet", "mainnet"]>>;
    WALLET_SET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    SELLER_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    SELLER_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    MARKETPLACE_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    DEPOSIT_AMOUNT_USDC: z.ZodEffects<z.ZodDefault<z.ZodString>, string, unknown>;
    ARC_CHAIN_ID: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number | undefined, unknown>;
    ARC_RPC_URL: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_CHAIN: z.ZodEffects<z.ZodDefault<z.ZodString>, string, unknown>;
    BUYER_PRIVATE_KEY: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    DEPOSIT_TIMEOUT_MS: z.ZodEffects<z.ZodDefault<z.ZodNumber>, number, unknown>;
    DEMO_LOAD_CYCLES: z.ZodEffects<z.ZodDefault<z.ZodNumber>, number, unknown>;
    EXCHANGE_API_URL: z.ZodEffects<z.ZodDefault<z.ZodString>, string, unknown>;
    BUYER_LUXURYCO_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_LUXURYCO_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_GROWTHCO_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_GROWTHCO_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_RETAILCO_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_RETAILCO_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strip", z.ZodTypeAny, {
    CIRCLE_API_KEY: string;
    CIRCLE_ENTITY_SECRET: string;
    CIRCLE_ENVIRONMENT: "testnet" | "mainnet";
    EXCHANGE_API_URL: string;
    BUYER_CHAIN: string;
    DEPOSIT_AMOUNT_USDC: string;
    DEPOSIT_TIMEOUT_MS: number;
    DEMO_LOAD_CYCLES: number;
    WALLET_SET_ID?: string | undefined;
    BUYER_PRIVATE_KEY?: string | undefined;
    BUYER_WALLET_ADDRESS?: string | undefined;
    BUYER_LUXURYCO_WALLET_ID?: string | undefined;
    BUYER_LUXURYCO_WALLET_ADDRESS?: string | undefined;
    BUYER_GROWTHCO_WALLET_ID?: string | undefined;
    BUYER_GROWTHCO_WALLET_ADDRESS?: string | undefined;
    BUYER_RETAILCO_WALLET_ID?: string | undefined;
    BUYER_RETAILCO_WALLET_ADDRESS?: string | undefined;
    ARC_CHAIN_ID?: number | undefined;
    BUYER_WALLET_ID?: string | undefined;
    SELLER_WALLET_ADDRESS?: string | undefined;
    SELLER_WALLET_ID?: string | undefined;
    MARKETPLACE_WALLET_ADDRESS?: string | undefined;
    ARC_RPC_URL?: string | undefined;
}, {
    CIRCLE_API_KEY: string;
    CIRCLE_ENTITY_SECRET: string;
    CIRCLE_ENVIRONMENT?: "testnet" | "mainnet" | undefined;
    WALLET_SET_ID?: unknown;
    EXCHANGE_API_URL?: unknown;
    BUYER_PRIVATE_KEY?: unknown;
    BUYER_CHAIN?: unknown;
    BUYER_WALLET_ADDRESS?: unknown;
    BUYER_LUXURYCO_WALLET_ID?: unknown;
    BUYER_LUXURYCO_WALLET_ADDRESS?: unknown;
    BUYER_GROWTHCO_WALLET_ID?: unknown;
    BUYER_GROWTHCO_WALLET_ADDRESS?: unknown;
    BUYER_RETAILCO_WALLET_ID?: unknown;
    BUYER_RETAILCO_WALLET_ADDRESS?: unknown;
    ARC_CHAIN_ID?: unknown;
    BUYER_WALLET_ID?: unknown;
    SELLER_WALLET_ADDRESS?: unknown;
    SELLER_WALLET_ID?: unknown;
    MARKETPLACE_WALLET_ADDRESS?: unknown;
    DEPOSIT_AMOUNT_USDC?: unknown;
    ARC_RPC_URL?: unknown;
    DEPOSIT_TIMEOUT_MS?: unknown;
    DEMO_LOAD_CYCLES?: unknown;
}>;
export type ScriptsConfig = z.infer<typeof ScriptsEnvSchema>;
export declare function loadScriptsConfig(env?: NodeJS.ProcessEnv): ScriptsConfig;
/** Hard guard against accidental mainnet actions. */
export declare function assertTestnet(config: ScriptsConfig): void;
export {};
//# sourceMappingURL=config.d.ts.map