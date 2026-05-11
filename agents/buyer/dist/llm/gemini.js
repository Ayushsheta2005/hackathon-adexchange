import { FunctionCallingMode, GoogleGenerativeAI, } from "@google/generative-ai";
import { zodToGeminiSchema } from "./zodToGeminiSchema.js";
const TRANSIENT_ERROR_RE = /\b(503|429|UNAVAILABLE|RESOURCE_EXHAUSTED|overloaded|high demand|Service Unavailable)\b/i;
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
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
export function createGeminiLlmAdapter(config) {
    const factory = config.clientFactory ??
        ((apiKey) => new GoogleGenerativeAI(apiKey));
    const client = factory(config.apiKey);
    const maxRetries = config.maxRetries ?? 3;
    const functionDeclarations = config.tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
        parameters: zodToGeminiSchema(tool.inputSchema),
    }));
    let chat = null;
    let firstTurnForced = false;
    function buildModel(system, mode) {
        const functionCallingConfig = mode === "forced" && config.forceFirstToolCall
            ? {
                mode: FunctionCallingMode.ANY,
                allowedFunctionNames: [config.forceFirstToolCall],
            }
            : { mode: FunctionCallingMode.AUTO };
        return client.getGenerativeModel({
            model: config.model,
            systemInstruction: system,
            tools: [{ functionDeclarations }],
            toolConfig: { functionCallingConfig },
        });
    }
    // Bounded retry: at most `maxRetries + 1` attempts. Each iteration either
    // returns on success or throws (if the error isn't transient or we're out
    // of retries). The unreachable throw at the end is a TS exhaustiveness pin.
    async function sendWithRetry(parts) {
        if (!chat)
            throw new Error("GeminiLlmAdapter: chat session not initialized");
        for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
            try {
                return await chat.sendMessage(parts);
            }
            catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                const transient = TRANSIENT_ERROR_RE.test(msg);
                if (!transient || attempt === maxRetries)
                    throw err;
                await sleep(1000 * 2 ** attempt);
            }
        }
        throw new Error("GeminiLlmAdapter: retry loop exhausted (unreachable)");
    }
    return {
        async step({ system, messages }) {
            const last = messages[messages.length - 1];
            if (!last) {
                throw new Error("GeminiLlmAdapter: empty message history");
            }
            let parts;
            if (messages.length === 1 && last.role === "user") {
                // Fresh agent run — start a new Gemini chat each time so tests and
                // repeat runs don't leak state from a prior conversation.
                const useForced = Boolean(config.forceFirstToolCall);
                const model = buildModel(system, useForced ? "forced" : "auto");
                chat = model.startChat();
                firstTurnForced = useForced;
                parts = [last.content];
            }
            else if (last.role === "tool") {
                if (!chat) {
                    throw new Error("GeminiLlmAdapter: received tool message before chat was initialized");
                }
                // If turn 1 used ANY-mode (forced), rebuild the session in AUTO mode
                // so the model can produce a final text response now that the tool
                // has run. History is preserved so Gemini still sees turn 1.
                if (firstTurnForced) {
                    const history = await chat.getHistory();
                    const model = buildModel(system, "auto");
                    chat = model.startChat({ history });
                    firstTurnForced = false;
                }
                let payload;
                try {
                    payload = JSON.parse(last.content);
                }
                catch {
                    throw new Error("GeminiLlmAdapter: malformed tool message content");
                }
                if (typeof payload.tool !== "string") {
                    throw new Error("GeminiLlmAdapter: tool message missing tool name");
                }
                parts = [
                    {
                        functionResponse: {
                            name: payload.tool,
                            response: (payload.out ?? {}),
                        },
                    },
                ];
            }
            else {
                throw new Error(`GeminiLlmAdapter: unexpected final message role "${last.role}"`);
            }
            const result = await sendWithRetry(parts);
            const calls = result.response.functionCalls();
            const call = calls?.[0];
            if (call) {
                return { toolCall: { name: call.name, args: call.args ?? {} } };
            }
            return { final: result.response.text() };
        },
    };
}
//# sourceMappingURL=gemini.js.map