import type { AgentTool } from "./tools/types.js";
/**
 * Minimal tool-calling loop. A later PRP swaps this for a real LangGraph
 * `StateGraph` with recursionLimit = MAX_AGENT_ITERATIONS. The iteration cap
 * is enforced here so scaffolded behavior already respects CLAUDE.md.
 */
export interface LlmDecision<TOut = unknown> {
    /** If present, the agent wants to call this tool with these args. */
    toolCall?: {
        name: string;
        args: unknown;
    };
    /** If present, the agent is done and this is the final answer. */
    final?: TOut;
}
export interface LlmAdapter {
    /** One LLM turn: receive history, return either a tool call or a final answer. */
    step(input: {
        system: string;
        messages: Array<{
            role: "user" | "assistant" | "tool";
            content: string;
        }>;
    }): Promise<LlmDecision<string>>;
}
export interface BuyerAgent {
    run(userMessage: string): Promise<{
        output: string;
        toolCalls: string[];
        iterations: number;
    }>;
    readonly tools: ReadonlyArray<AgentTool<unknown, unknown>>;
}
export interface CreateBuyerAgentDeps {
    llm: LlmAdapter;
    tools: ReadonlyArray<AgentTool<unknown, unknown>>;
    systemPrompt: string;
    /** Override for tests. Defaults to MAX_AGENT_ITERATIONS (5). */
    maxIterations?: number;
}
export declare function createBuyerAgent(deps: CreateBuyerAgentDeps): BuyerAgent;
//# sourceMappingURL=agent.d.ts.map