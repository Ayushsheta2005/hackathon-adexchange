import { z } from "zod";
/** EVM address — 0x-prefixed 40-hex. */
export declare const WalletAddressSchema: z.ZodString;
/**
 * USDC amount encoded as decimal string with up to 6 fractional digits.
 * Keep string form through every boundary; convert to BigInt atomic units
 * only inside the auction / settlement engine.
 */
export declare const UsdcAmountSchema: z.ZodString;
/** 32-byte EIP-3009 nonce. */
export declare const Eip3009NonceSchema: z.ZodString;
/** RFC-3339 datetime string. */
export declare const IsoDateTimeSchema: z.ZodString;
/** Ad geometry descriptor — "300x250", "728x90", etc. */
export declare const AdSizeSchema: z.ZodString;
export declare const AdTypeSchema: z.ZodEnum<["display", "video", "native"]>;
export declare const AdFormatSchema: z.ZodString;
export declare const AdTargetingSchema: z.ZodObject<{
    adType: z.ZodEnum<["display", "video", "native"]>;
    format: z.ZodString;
    size: z.ZodString;
    contextTags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    adType: "display" | "video" | "native";
    format: string;
    size: string;
    contextTags: string[];
}, {
    adType: "display" | "video" | "native";
    format: string;
    size: string;
    contextTags?: string[] | undefined;
}>;
//# sourceMappingURL=primitives.d.ts.map