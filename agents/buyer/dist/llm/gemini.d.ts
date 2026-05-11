import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LlmAdapter } from "../agent.js";
import type { AgentTool } from "../tools/types.js";
export interface GeminiLlmAdapterConfig {
    apiKey: string;
    model: string;
    tools: ReadonlyArray<AgentTool<unknown, unknown>>;
    /**
     * Test seam — lets a mock stand in for `new GoogleGenerativeAI(apiKey)` so
     * unit tests can assert on function-declaration wiring without a real HTTP
     * call. Production callers should leave this undefined.
     */
    clientFactory?: (apiKey: string) => GoogleGenerativeAIClient;
    /**
     * If set, the FIRST turn of a fresh agent run is configured with
     * `FunctionCallingMode.ANY` and `allowedFunctionNames: [forceFirstToolCall]`,
     * so Gemini cannot answer with text — it must call this tool. Subsequent
     * turns switch back to AUTO so the model can produce a final text response.
     *
     * Use for single-purpose agents (e.g. seller's listInventory loop) where
     * the AUTO-mode "answers in text instead of calling the tool" failure mode
     * silently kills cycles.
     */
    forceFirstToolCall?: string;
    /**
     * Number of retries for transient Gemini errors (503 / 429 / "high demand").
     * Defaults to 3. Backoff: 1s → 2s → 4s.
     */
    maxRetries?: number;
}
/** Structural subset of `GoogleGenerativeAI` we actually touch — used for mocking. */
export interface GoogleGenerativeAIClient {
    getGenerativeModel: GoogleGenerativeAI["getGenerativeModel"];
}
/**
 * Bridge `LlmAdapter` ← `@google/generative-ai`.
 *
 * Each tool becomes a Gemini `FunctionDeclaration`, carrying the existing
 * `description` verbatim (the LLM selects tools from descriptions alone, per
 * CLAUDE.md § Agent Framework Rules).
 *
 * The adapter keeps a single `ChatSession` so that Gemini sees a coherent
 * sequence of user → functionCall → functionResponse turns. When the agent
 * loop starts a fresh run (`messages.length === 1 && role === "user"`) we
 * reset the session.
 *
 * If `forceFirstToolCall` is set, the first turn uses ANY mode (forced tool
 * call) and the second turn rebuilds the session with AUTO mode (preserving
 * history) so the model can produce a final text answer.
 */
export declare function createGeminiLlmAdapter(config: GeminiLlmAdapterConfig): LlmAdapter;
//# sourceMappingURL=gemini.d.ts.map