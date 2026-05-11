import { z } from "zod";
declare const ServerEnvSchema: z.ZodEffects<z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "test", "production"]>>;
    PORT: z.ZodDefault<z.ZodNumber>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<["trace", "debug", "info", "warn", "error", "fatal", "silent"]>>;
    CORS_ALLOW_ORIGINS: z.ZodDefault<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string[], string>>;
    BID_RATE_LIMIT_PER_MIN: z.ZodDefault<z.ZodNumber>;
    ASSISTANT_CHAT_RATE_LIMIT_PER_MIN: z.ZodDefault<z.ZodNumber>;
    ARC_CHAIN_ID: z.ZodDefault<z.ZodNumber>;
    BUYER_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_LUXURYCO_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_LUXURYCO_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_GROWTHCO_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_GROWTHCO_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_RETAILCO_WALLET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_RETAILCO_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    SELLER_WALLET_ADDRESS: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    BUYER_PRIVATE_KEY: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    GATEWAY_FACILITATOR_URL: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    GEMINI_API_KEY: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    GEMINI_MODEL: z.ZodEffects<z.ZodDefault<z.ZodString>, string, unknown>;
    MAX_CLEARING_PRICE_USDC: z.ZodEffects<z.ZodDefault<z.ZodString>, string, string | undefined>;
    DEMO_MODE: z.ZodDefault<z.ZodEnum<["in_process", "external"]>>;
    AUCTION_AUTO_CLEAR_DELAY_MS: z.ZodDefault<z.ZodNumber>;
    /** Set to `1` or `true` in development to load visualization fixtures (forbidden in production). */
    UI_FIXTURE_SEED: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strip", z.ZodTypeAny, {
    GEMINI_MODEL: string;
    NODE_ENV: "development" | "test" | "production";
    PORT: number;
    LOG_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
    CORS_ALLOW_ORIGINS: string[];
    BID_RATE_LIMIT_PER_MIN: number;
    ASSISTANT_CHAT_RATE_LIMIT_PER_MIN: number;
    ARC_CHAIN_ID: number;
    MAX_CLEARING_PRICE_USDC: string;
    DEMO_MODE: "in_process" | "external";
    AUCTION_AUTO_CLEAR_DELAY_MS: number;
    GEMINI_API_KEY?: string | undefined;
    BUYER_PRIVATE_KEY?: string | undefined;
    BUYER_LUXURYCO_WALLET_ID?: string | undefined;
    BUYER_LUXURYCO_WALLET_ADDRESS?: string | undefined;
    BUYER_GROWTHCO_WALLET_ID?: string | undefined;
    BUYER_GROWTHCO_WALLET_ADDRESS?: string | undefined;
    BUYER_RETAILCO_WALLET_ID?: string | undefined;
    BUYER_RETAILCO_WALLET_ADDRESS?: string | undefined;
    BUYER_WALLET_ID?: string | undefined;
    SELLER_WALLET_ADDRESS?: string | undefined;
    GATEWAY_FACILITATOR_URL?: string | undefined;
    UI_FIXTURE_SEED?: string | undefined;
}, {
    GEMINI_API_KEY?: unknown;
    GEMINI_MODEL?: unknown;
    BUYER_PRIVATE_KEY?: unknown;
    BUYER_LUXURYCO_WALLET_ID?: unknown;
    BUYER_LUXURYCO_WALLET_ADDRESS?: unknown;
    BUYER_GROWTHCO_WALLET_ID?: unknown;
    BUYER_GROWTHCO_WALLET_ADDRESS?: unknown;
    BUYER_RETAILCO_WALLET_ID?: unknown;
    BUYER_RETAILCO_WALLET_ADDRESS?: unknown;
    NODE_ENV?: "development" | "test" | "production" | undefined;
    PORT?: number | undefined;
    LOG_LEVEL?: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent" | undefined;
    CORS_ALLOW_ORIGINS?: string | undefined;
    BID_RATE_LIMIT_PER_MIN?: number | undefined;
    ASSISTANT_CHAT_RATE_LIMIT_PER_MIN?: number | undefined;
    ARC_CHAIN_ID?: number | undefined;
    BUYER_WALLET_ID?: unknown;
    SELLER_WALLET_ADDRESS?: unknown;
    GATEWAY_FACILITATOR_URL?: unknown;
    MAX_CLEARING_PRICE_USDC?: string | undefined;
    DEMO_MODE?: "in_process" | "external" | undefined;
    AUCTION_AUTO_CLEAR_DELAY_MS?: number | undefined;
    UI_FIXTURE_SEED?: unknown;
}>, {
    GEMINI_MODEL: string;
    NODE_ENV: "development" | "test" | "production";
    PORT: number;
    LOG_LEVEL: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
    CORS_ALLOW_ORIGINS: string[];
    BID_RATE_LIMIT_PER_MIN: number;
    ASSISTANT_CHAT_RATE_LIMIT_PER_MIN: number;
    ARC_CHAIN_ID: number;
    MAX_CLEARING_PRICE_USDC: string;
    DEMO_MODE: "in_process" | "external";
    AUCTION_AUTO_CLEAR_DELAY_MS: number;
    GEMINI_API_KEY?: string | undefined;
    BUYER_PRIVATE_KEY?: string | undefined;
    BUYER_LUXURYCO_WALLET_ID?: string | undefined;
    BUYER_LUXURYCO_WALLET_ADDRESS?: string | undefined;
    BUYER_GROWTHCO_WALLET_ID?: string | undefined;
    BUYER_GROWTHCO_WALLET_ADDRESS?: string | undefined;
    BUYER_RETAILCO_WALLET_ID?: string | undefined;
    BUYER_RETAILCO_WALLET_ADDRESS?: string | undefined;
    BUYER_WALLET_ID?: string | undefined;
    SELLER_WALLET_ADDRESS?: string | undefined;
    GATEWAY_FACILITATOR_URL?: string | undefined;
    UI_FIXTURE_SEED?: string | undefined;
}, {
    GEMINI_API_KEY?: unknown;
    GEMINI_MODEL?: unknown;
    BUYER_PRIVATE_KEY?: unknown;
    BUYER_LUXURYCO_WALLET_ID?: unknown;
    BUYER_LUXURYCO_WALLET_ADDRESS?: unknown;
    BUYER_GROWTHCO_WALLET_ID?: unknown;
    BUYER_GROWTHCO_WALLET_ADDRESS?: unknown;
    BUYER_RETAILCO_WALLET_ID?: unknown;
    BUYER_RETAILCO_WALLET_ADDRESS?: unknown;
    NODE_ENV?: "development" | "test" | "production" | undefined;
    PORT?: number | undefined;
    LOG_LEVEL?: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent" | undefined;
    CORS_ALLOW_ORIGINS?: string | undefined;
    BID_RATE_LIMIT_PER_MIN?: number | undefined;
    ASSISTANT_CHAT_RATE_LIMIT_PER_MIN?: number | undefined;
    ARC_CHAIN_ID?: number | undefined;
    BUYER_WALLET_ID?: unknown;
    SELLER_WALLET_ADDRESS?: unknown;
    GATEWAY_FACILITATOR_URL?: unknown;
    MAX_CLEARING_PRICE_USDC?: string | undefined;
    DEMO_MODE?: "in_process" | "external" | undefined;
    AUCTION_AUTO_CLEAR_DELAY_MS?: number | undefined;
    UI_FIXTURE_SEED?: unknown;
}>;
export type ServerEnvParsed = z.infer<typeof ServerEnvSchema>;
export type ServerConfig = ServerEnvParsed & {
    /** True when fixtures should load (never in production). */
    uiFixtureSeedEnabled: boolean;
};
/**
 * Map of lowercased buyer wallet address → Circle DCW wallet id. The auction
 * route consults this when settling: the winning bid's `buyerWallet` is
 * matched against the map to pick the funding wallet for the on-chain
 * transfer. Empty when no persona wallets are configured.
 */
export type BuyerWalletRouting = ReadonlyMap<string, string>;
export declare function buildBuyerWalletRouting(config: ServerConfig): BuyerWalletRouting;
export declare function loadServerConfig(env?: NodeJS.ProcessEnv): ServerConfig;
export {};
//# sourceMappingURL=config.d.ts.map