import { MAX_AGENT_ITERATIONS } from "@ade/shared";
export function createBuyerAgent(deps) {
    const cap = deps.maxIterations ?? MAX_AGENT_ITERATIONS;
    const toolIndex = new Map(deps.tools.map((t) => [t.name, t]));
    return {
        tools: deps.tools,
        async run(userMessage) {
            const history = [
                { role: "user", content: userMessage },
            ];
            const toolCalls = [];
            for (let i = 0; i < cap; i++) {
                const decision = await deps.llm.step({ system: deps.systemPrompt, messages: history });
                if (decision.final !== undefined) {
                    return { output: decision.final, toolCalls, iterations: i + 1 };
                }
                if (!decision.toolCall) {
                    throw new Error("LLM returned neither a tool call nor a final answer");
                }
                const tool = toolIndex.get(decision.toolCall.name);
                if (!tool) {
                    throw new Error(`Unknown tool: ${decision.toolCall.name}`);
                }
                toolCalls.push(tool.name);
                const args = tool.inputSchema.parse(decision.toolCall.args);
                const out = await tool.invoke(args);
                const parsedOut = tool.outputSchema.parse(out);
                history.push({
                    role: "tool",
                    content: JSON.stringify({ tool: tool.name, out: parsedOut }),
                });
            }
            return { output: "(iteration cap reached)", toolCalls, iterations: cap };
        },
    };
}
//# sourceMappingURL=agent.js.map