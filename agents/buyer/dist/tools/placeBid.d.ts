import { GatewayClient, type SupportedChainName } from "@circle-fin/x402-batching/client";
import { z } from "zod";
import type { AgentTool } from "./types.js";
/**
 * LLM-facing input — only the creative fields the agent should choose.
 * Identity fields (bidId, buyerAgentId, buyerWallet, nonce, createdAt) are
 * injected by the tool from deps so the LLM cannot hallucinate them.
 */
declare const PlaceBidInputSchema: z.ZodObject<{
    bidAmountUsdc: z.ZodString;
    budgetRemainingUsdc: z.ZodString;
    targeting: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    targeting: {
        adType: "display" | "video" | "native";
        format: string;
        size: string;
        contextTags: string[];
    };
    bidAmountUsdc: string;
    budgetRemainingUsdc: string;
}, {
    targeting: {
        adType: "display" | "video" | "native";
        format: string;
        size: string;
        contextTags?: string[] | undefined;
    };
    bidAmountUsdc: string;
    budgetRemainingUsdc: string;
}>;
declare const OutputSchema: z.ZodObject<{
    bidId: z.ZodString;
    accepted: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    bidId: string;
    accepted: boolean;
}, {
    bidId: string;
    accepted: boolean;
}>;
export interface PlaceBidDeps {
    exchangeUrl: string;
    buyerAgentId: string;
    buyerWallet: string;
    /** Injectable fetch for tests. */
    fetchImpl?: typeof fetch;
    /**
     * When present, POST /bid is gated by x402. GatewayClient handles the 402
     * automatically: signs an EIP-3009 authorization and retries with the
     * Payment-Signature header. The private key never reaches the LLM layer.
     */
    gatewayClient?: GatewayClient;
    randomUuidImpl?: () => string;
    nonceImpl?: () => string;
    nowImpl?: () => Date;
}
export declare function createPlaceBidTool(deps: PlaceBidDeps): AgentTool<z.infer<typeof PlaceBidInputSchema>, z.infer<typeof OutputSchema>>;
/**
 * Build a GatewayClient for use in placeBid.
 * Kept separate so callers that don't have a private key can omit it
 * and fall back to the plain-fetch path.
 */
export declare function buildGatewayClient(privateKey: `0x${string}`, chain: SupportedChainName): GatewayClient;
export {};
//# sourceMappingURL=placeBid.d.ts.map