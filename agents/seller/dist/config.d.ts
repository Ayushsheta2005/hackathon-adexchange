import { z } from "zod";
declare const SellerEnvSchema: z.ZodObject<{
    GEMINI_API_KEY: z.ZodString;
    GEMINI_MODEL: z.ZodDefault<z.ZodString>;
    EXCHANGE_API_URL: z.ZodDefault<z.ZodString>;
    SELLER_WALLET_ADDRESS: z.ZodString;
    SELLER_LISTING_INTERVAL_MS: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    GEMINI_API_KEY: string;
    GEMINI_MODEL: string;
    EXCHANGE_API_URL: string;
    SELLER_WALLET_ADDRESS: string;
    SELLER_LISTING_INTERVAL_MS: number;
}, {
    GEMINI_API_KEY: string;
    SELLER_WALLET_ADDRESS: string;
    GEMINI_MODEL?: string | undefined;
    EXCHANGE_API_URL?: string | undefined;
    SELLER_LISTING_INTERVAL_MS?: number | undefined;
}>;
export type SellerAgentConfig = z.infer<typeof SellerEnvSchema>;
export declare function loadSellerConfig(env?: NodeJS.ProcessEnv): SellerAgentConfig;
export {};
//# sourceMappingURL=config.d.ts.map