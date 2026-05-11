import { z } from "zod";
import type { AgentTool } from "./types.js";
/**
 * LLM-facing input — only the creative fields the agent should choose.
 * Identity fields (listingId, sellerAgentId, sellerWallet, createdAt) are
 * injected by the tool from deps so the LLM cannot hallucinate them.
 */
declare const ListInventoryInputSchema: z.ZodObject<{
    adType: z.ZodEnum<["display", "video", "native"]>;
    format: z.ZodString;
    size: z.ZodString;
    contextualExclusions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    floorPriceUsdc: z.ZodString;
}, "strip", z.ZodTypeAny, {
    adType: "display" | "video" | "native";
    format: string;
    size: string;
    contextualExclusions: string[];
    floorPriceUsdc: string;
}, {
    adType: "display" | "video" | "native";
    format: string;
    size: string;
    floorPriceUsdc: string;
    contextualExclusions?: string[] | undefined;
}>;
declare const OutputSchema: z.ZodObject<{
    listingId: z.ZodString;
    accepted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    listingId: string;
    accepted: boolean;
}, {
    listingId: string;
    accepted: boolean;
}>;
export interface ListInventoryDeps {
    exchangeUrl: string;
    sellerAgentId: string;
    sellerWallet: string;
    fetchImpl?: typeof fetch;
    randomUuidImpl?: () => string;
    nowImpl?: () => Date;
}
export declare function createListInventoryTool(deps: ListInventoryDeps): AgentTool<z.infer<typeof ListInventoryInputSchema>, z.infer<typeof OutputSchema>>;
export {};
//# sourceMappingURL=listInventory.d.ts.map