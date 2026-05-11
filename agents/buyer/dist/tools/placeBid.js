import { randomBytes, randomUUID } from "node:crypto";
import { AdTargetingSchema, BidRequestSchema, UsdcAmountSchema } from "@ade/shared";
import { GatewayClient } from "@circle-fin/x402-batching/client";
import { z } from "zod";
/**
 * LLM-facing input — only the creative fields the agent should choose.
 * Identity fields (bidId, buyerAgentId, buyerWallet, nonce, createdAt) are
 * injected by the tool from deps so the LLM cannot hallucinate them.
 */
const PlaceBidInputSchema = z.object({
    bidAmountUsdc: UsdcAmountSchema,
    budgetRemainingUsdc: UsdcAmountSchema,
    targeting: AdTargetingSchema,
});
const OutputSchema = z.object({
    bidId: z.string().uuid(),
    accepted: z.boolean(),
});
function defaultNonce() {
    return "0x" + randomBytes(32).toString("hex");
}
export function createPlaceBidTool(deps) {
    const fetcher = deps.fetchImpl ?? fetch;
    const uuid = deps.randomUuidImpl ?? randomUUID;
    const nonceFn = deps.nonceImpl ?? defaultNonce;
    const now = deps.nowImpl ?? (() => new Date());
    return {
        name: "placeBid",
        description: "Submit a bid to the Exchange for an ad impression. Provide bidAmountUsdc, budgetRemainingUsdc, and a targeting object (adType, format, size, contextTags). Use when the agent has decided to compete for an impression.",
        inputSchema: PlaceBidInputSchema,
        outputSchema: OutputSchema,
        async invoke(input) {
            const bid = BidRequestSchema.parse({
                ...input,
                bidId: uuid(),
                buyerAgentId: deps.buyerAgentId,
                buyerWallet: deps.buyerWallet,
                nonce: nonceFn(),
                createdAt: now().toISOString(),
            });
            const url = `${deps.exchangeUrl}/bid`;
            if (deps.gatewayClient) {
                // Reason: GatewayClient sets Content-Type: application/json internally.
                // Passing it again creates a duplicate that joins as
                // "application/json, application/json", breaking Express body-parser.
                const result = await deps.gatewayClient.pay(url, {
                    method: "POST",
                    body: bid,
                });
                if (result.status === 202) {
                    return OutputSchema.parse({ bidId: result.data.bidId, accepted: true });
                }
                return OutputSchema.parse({ bidId: bid.bidId, accepted: false });
            }
            const res = await fetcher(url, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(bid),
            });
            const json = (await res.json());
            if (res.status === 202) {
                return OutputSchema.parse({ bidId: json.bidId, accepted: true });
            }
            return OutputSchema.parse({ bidId: bid.bidId, accepted: false });
        },
    };
}
/**
 * Build a GatewayClient for use in placeBid.
 * Kept separate so callers that don't have a private key can omit it
 * and fall back to the plain-fetch path.
 */
export function buildGatewayClient(privateKey, chain) {
    return new GatewayClient({ chain, privateKey });
}
//# sourceMappingURL=placeBid.js.map