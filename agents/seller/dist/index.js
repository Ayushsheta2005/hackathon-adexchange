import { createSellerAgent } from "./agent.js";
import { loadSellerConfig } from "./config.js";
import { createGeminiLlmAdapter } from "./llm/gemini.js";
import { SELLER_SYSTEM_PROMPT } from "./prompt.js";
import { createListInventoryTool, createServeAdTool, createViewHistoryTool, } from "./tools/index.js";
export { createSellerAgent } from "./agent.js";
export { SELLER_SYSTEM_PROMPT } from "./prompt.js";
export { loadSellerConfig } from "./config.js";
export { createListInventoryTool, createServeAdTool, createViewHistoryTool, } from "./tools/index.js";
export { createGeminiLlmAdapter } from "./llm/gemini.js";
// Reason: single-seller demo; agent ID is fixed in-code rather than added to
// env config. Mirrors the literal used by runSeller's prior prompt.
const SELLER_AGENT_ID = "seller-default";
function buildTools(deps) {
    return [
        createListInventoryTool({
            exchangeUrl: deps.exchangeUrl,
            sellerAgentId: deps.sellerAgentId,
            sellerWallet: deps.sellerWallet,
        }),
        createServeAdTool({ exchangeUrl: deps.exchangeUrl }),
        createViewHistoryTool({ exchangeUrl: deps.exchangeUrl }),
    ];
}
/**
 * Wire the seller agent against Google Gemini direct. The seller's typed
 * config (`loadSellerConfig`) requires `GEMINI_API_KEY` and `GEMINI_MODEL`.
 */
export function createSellerAgentWithGemini(overrides = {}) {
    const config = overrides.config ?? loadSellerConfig();
    const tools = buildTools({
        exchangeUrl: config.EXCHANGE_API_URL,
        sellerAgentId: SELLER_AGENT_ID,
        sellerWallet: config.SELLER_WALLET_ADDRESS,
    });
    const llm = createGeminiLlmAdapter({
        apiKey: config.GEMINI_API_KEY,
        model: config.GEMINI_MODEL,
        tools,
        // Reason: each cycle has exactly one job — register a listing. Forcing
        // the first tool call eliminates the AUTO-mode "answer in text instead
        // of calling the tool" failure that was killing ~80% of cycles.
        forceFirstToolCall: "listInventory",
    });
    return createSellerAgent({ llm, tools, systemPrompt: SELLER_SYSTEM_PROMPT });
}
//# sourceMappingURL=index.js.map