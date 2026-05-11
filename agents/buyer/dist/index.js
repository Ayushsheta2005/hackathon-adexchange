import { createBuyerAgent } from "./agent.js";
import { loadBuyerConfig } from "./config.js";
import { createGeminiLlmAdapter } from "./llm/index.js";
import { BUYER_SYSTEM_PROMPT } from "./prompt.js";
import { buildGatewayClient, createCheckBalanceTool, createPlaceBidTool, createReviewAuctionTool, } from "./tools/index.js";
export { createBuyerAgent } from "./agent.js";
export { BUYER_SYSTEM_PROMPT } from "./prompt.js";
export { loadBuyerConfig } from "./config.js";
export { createPlaceBidTool, createCheckBalanceTool, createReviewAuctionTool, buildGatewayClient, } from "./tools/index.js";
export { createGeminiLlmAdapter, zodToGeminiSchema } from "./llm/index.js";
function buildTools(deps) {
    const gatewayClient = deps.privateKey
        ? buildGatewayClient(deps.privateKey, deps.chain ?? "arcTestnet")
        : undefined;
    return [
        createPlaceBidTool({
            exchangeUrl: deps.exchangeUrl,
            buyerAgentId: deps.buyerAgentId,
            buyerWallet: deps.buyerWallet,
            gatewayClient,
        }),
        createCheckBalanceTool({ exchangeUrl: deps.exchangeUrl }),
        createReviewAuctionTool({ exchangeUrl: deps.exchangeUrl }),
    ];
}
/**
 * Wire the buyer agent against Google Gemini direct. The buyer's typed config
 * (`loadBuyerConfig`) requires `GEMINI_API_KEY` and `GEMINI_MODEL`.
 * When `BUYER_PRIVATE_KEY` is set, placeBid uses GatewayClient to handle 402.
 */
export function createBuyerAgentWithGemini(overrides = {}) {
    const config = overrides.config ?? loadBuyerConfig();
    const tools = buildTools({
        exchangeUrl: config.EXCHANGE_API_URL,
        buyerAgentId: config.BUYER_AGENT_ID,
        buyerWallet: config.BUYER_WALLET_ADDRESS,
        privateKey: config.BUYER_PRIVATE_KEY,
        chain: config.BUYER_CHAIN,
    });
    const llm = createGeminiLlmAdapter({
        apiKey: config.GEMINI_API_KEY,
        model: config.GEMINI_MODEL,
        tools,
    });
    return createBuyerAgent({ llm, tools, systemPrompt: BUYER_SYSTEM_PROMPT });
}
//# sourceMappingURL=index.js.map