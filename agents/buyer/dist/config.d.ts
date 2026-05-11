import { z } from "zod";
declare const BuyerEnvSchema: z.ZodObject<{
    GEMINI_API_KEY: z.ZodString;
    GEMINI_MODEL: z.ZodDefault<z.ZodString>;
    EXCHANGE_API_URL: z.ZodDefault<z.ZodString>;
    BUYER_PRIVATE_KEY: z.ZodOptional<z.ZodString>;
    BUYER_CHAIN: z.ZodDefault<z.ZodString>;
    BUYER_AGENT_ID: z.ZodString;
    BUYER_AGENT_BRAND: z.ZodString;
    BUYER_AGENT_STRATEGY: z.ZodString;
    BUYER_AGENT_MAX_BID_USDC: z.ZodString;
    BUYER_AGENT_MIN_BID_USDC: z.ZodString;
    BUYER_AGENT_PREFERRED_TAGS: z.ZodEffects<z.ZodString, string[], string>;
    BUYER_WALLET_ADDRESS: z.ZodString;
    BUYER_POLL_INTERVAL_MS: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    GEMINI_API_KEY: string;
    GEMINI_MODEL: string;
    EXCHANGE_API_URL: string;
    BUYER_CHAIN: string;
    BUYER_AGENT_ID: string;
    BUYER_AGENT_BRAND: string;
    BUYER_AGENT_STRATEGY: string;
    BUYER_AGENT_MAX_BID_USDC: string;
    BUYER_AGENT_MIN_BID_USDC: string;
    BUYER_AGENT_PREFERRED_TAGS: string[];
    BUYER_WALLET_ADDRESS: string;
    BUYER_POLL_INTERVAL_MS: number;
    BUYER_PRIVATE_KEY?: string | undefined;
}, {
    GEMINI_API_KEY: string;
    BUYER_AGENT_ID: string;
    BUYER_AGENT_BRAND: string;
    BUYER_AGENT_STRATEGY: string;
    BUYER_AGENT_MAX_BID_USDC: string;
    BUYER_AGENT_MIN_BID_USDC: string;
    BUYER_AGENT_PREFERRED_TAGS: string;
    BUYER_WALLET_ADDRESS: string;
    GEMINI_MODEL?: string | undefined;
    EXCHANGE_API_URL?: string | undefined;
    BUYER_PRIVATE_KEY?: string | undefined;
    BUYER_CHAIN?: string | undefined;
    BUYER_POLL_INTERVAL_MS?: number | undefined;
}>;
export type BuyerAgentConfig = z.infer<typeof BuyerEnvSchema>;
export declare function loadBuyerConfig(env?: NodeJS.ProcessEnv): BuyerAgentConfig;
export {};
//# sourceMappingURL=config.d.ts.map