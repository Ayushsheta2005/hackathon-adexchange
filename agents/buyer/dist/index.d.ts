import { type BuyerAgent } from "./agent.js";
import { type BuyerAgentConfig } from "./config.js";
export { createBuyerAgent } from "./agent.js";
export type { BuyerAgent, CreateBuyerAgentDeps, LlmAdapter, LlmDecision } from "./agent.js";
export { BUYER_SYSTEM_PROMPT } from "./prompt.js";
export { loadBuyerConfig } from "./config.js";
export type { BuyerAgentConfig } from "./config.js";
export { createPlaceBidTool, createCheckBalanceTool, createReviewAuctionTool, buildGatewayClient, } from "./tools/index.js";
export type { AgentTool } from "./tools/index.js";
export { createGeminiLlmAdapter, zodToGeminiSchema } from "./llm/index.js";
export type { GeminiLlmAdapterConfig, GoogleGenerativeAIClient } from "./llm/index.js";
/**
 * Wire the buyer agent against Google Gemini direct. The buyer's typed config
 * (`loadBuyerConfig`) requires `GEMINI_API_KEY` and `GEMINI_MODEL`.
 * When `BUYER_PRIVATE_KEY` is set, placeBid uses GatewayClient to handle 402.
 */
export declare function createBuyerAgentWithGemini(overrides?: {
    config?: BuyerAgentConfig;
}): BuyerAgent;
//# sourceMappingURL=index.d.ts.map