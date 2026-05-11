import { type SellerAgent } from "./agent.js";
import { type SellerAgentConfig } from "./config.js";
export { createSellerAgent } from "./agent.js";
export type { SellerAgent, CreateSellerAgentDeps, LlmAdapter, LlmDecision } from "./agent.js";
export { SELLER_SYSTEM_PROMPT } from "./prompt.js";
export { loadSellerConfig } from "./config.js";
export type { SellerAgentConfig } from "./config.js";
export { createListInventoryTool, createServeAdTool, createViewHistoryTool, } from "./tools/index.js";
export type { AgentTool } from "./tools/index.js";
export { createGeminiLlmAdapter } from "./llm/gemini.js";
export type { GeminiLlmAdapterConfig, GoogleGenerativeAIClient } from "./llm/gemini.js";
/**
 * Wire the seller agent against Google Gemini direct. The seller's typed
 * config (`loadSellerConfig`) requires `GEMINI_API_KEY` and `GEMINI_MODEL`.
 */
export declare function createSellerAgentWithGemini(overrides?: {
    config?: SellerAgentConfig;
}): SellerAgent;
//# sourceMappingURL=index.d.ts.map