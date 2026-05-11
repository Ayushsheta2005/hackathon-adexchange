import { z } from "zod";
/**
 * Typed config for @ade/wallets. The Circle entity secret and API key live
 * here and here only — no other file in this package reads process.env.
 * See CLAUDE.md § Security.
 */
declare const WalletsEnvSchema: z.ZodObject<{
    CIRCLE_API_KEY: z.ZodString;
    CIRCLE_ENTITY_SECRET: z.ZodString;
    CIRCLE_ENVIRONMENT: z.ZodDefault<z.ZodEnum<["testnet", "mainnet"]>>;
    WALLET_SET_ID: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strip", z.ZodTypeAny, {
    CIRCLE_API_KEY: string;
    CIRCLE_ENTITY_SECRET: string;
    CIRCLE_ENVIRONMENT: "testnet" | "mainnet";
    WALLET_SET_ID?: string | undefined;
}, {
    CIRCLE_API_KEY: string;
    CIRCLE_ENTITY_SECRET: string;
    CIRCLE_ENVIRONMENT?: "testnet" | "mainnet" | undefined;
    WALLET_SET_ID?: unknown;
}>;
export type WalletsConfig = z.infer<typeof WalletsEnvSchema>;
/**
 * Parse the env once. Throws on missing/malformed. Call at module load
 * from a server-side entry only — never from ui/.
 */
export declare function loadWalletsConfig(env?: NodeJS.ProcessEnv): WalletsConfig;
export {};
//# sourceMappingURL=config.d.ts.map