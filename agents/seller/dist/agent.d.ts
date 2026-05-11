import type { AgentTool } from "./tools/types.js";
export interface LlmDecision<TOut = unknown> {
    toolCall?: {
        name: string;
        args: unknown;
    };
    final?: TOut;
}
export interface LlmAdapter {
    step(input: {
        system: string;
        messages: Array<{
            role: "user" | "assistant" | "tool";
            content: string;
        }>;
    }): Promise<LlmDecision<string>>;
}
export interface SellerAgent {
    run(userMessage: string): Promise<{
        output: string;
        toolCalls: string[];
        iterations: number;
    }>;
    readonly tools: ReadonlyArray<AgentTool<unknown, unknown>>;
}
export interface CreateSellerAgentDeps {
    llm: LlmAdapter;
    tools: ReadonlyArray<AgentTool<unknown, unknown>>;
    systemPrompt: string;
    maxIterations?: number;
}
export declare function createSellerAgent(deps: CreateSellerAgentDeps): SellerAgent;
//# sourceMappingURL=agent.d.ts.map