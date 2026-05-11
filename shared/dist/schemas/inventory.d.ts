import { z } from "zod";
export declare const AdInventoryListingSchema: z.ZodObject<{
    listingId: z.ZodString;
    sellerAgentId: z.ZodString;
    sellerWallet: z.ZodString;
    adType: z.ZodEnum<["display", "video", "native"]>;
    format: z.ZodString;
    size: z.ZodString;
    contextualExclusions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    floorPriceUsdc: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    adType: "display" | "video" | "native";
    format: string;
    size: string;
    listingId: string;
    sellerAgentId: string;
    sellerWallet: string;
    contextualExclusions: string[];
    floorPriceUsdc: string;
    createdAt: string;
}, {
    adType: "display" | "video" | "native";
    format: string;
    size: string;
    listingId: string;
    sellerAgentId: string;
    sellerWallet: string;
    floorPriceUsdc: string;
    createdAt: string;
    contextualExclusions?: string[] | undefined;
}>;
export type AdInventoryListing = z.infer<typeof AdInventoryListingSchema>;
//# sourceMappingURL=inventory.d.ts.map