import { z } from "zod";

import type { LlmAdapter, LlmDecision } from "../agent.js";
import type { AgentTool } from "../tools/types.js";

export interface GrokLlmAdapterConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
  tools: ReadonlyArray<AgentTool<unknown, unknown>>;
  maxRetries?: number;
}

interface OpenAIFunction {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

interface OpenAIMessage {
  role: "system" | "user" | "assistant" | "tool";
  content?: string | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
  tool_call_id?: string;
}

const TRANSIENT_RE = /\b(503|429|502|UNAVAILABLE|overloaded|rate.limit|Service Unavailable)\b/i;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function zodToJsonSchema(schema: z.ZodTypeAny): Record<string, unknown> {
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodDefault) {
    return zodToJsonSchema((schema as z.ZodOptional<z.ZodTypeAny>)._def.innerType as z.ZodTypeAny);
  }
  if (schema instanceof z.ZodEffects) {
    return zodToJsonSchema(schema._def.schema as z.ZodTypeAny);
  }
  if (schema instanceof z.ZodString) return { type: "string" };
  if (schema instanceof z.ZodNumber) {
    const checks = ((schema as z.ZodNumber)._def.checks ?? []) as Array<{ kind: string }>;
    return { type: checks.some((c) => c.kind === "int") ? "integer" : "number" };
  }
  if (schema instanceof z.ZodBoolean) return { type: "boolean" };
  if (schema instanceof z.ZodEnum) {
    return { type: "string", enum: schema._def.values as string[] };
  }
  if (schema instanceof z.ZodArray) {
    return { type: "array", items: zodToJsonSchema(schema._def.type as z.ZodTypeAny) };
  }
  if (schema instanceof z.ZodObject) {
    const rawShape = schema._def.shape() as Record<string, z.ZodTypeAny>;
    const properties: Record<string, unknown> = {};
    const required: string[] = [];
    for (const [key, value] of Object.entries(rawShape)) {
      properties[key] = zodToJsonSchema(value);
      if (!(value instanceof z.ZodOptional) && !(value instanceof z.ZodDefault)) {
        required.push(key);
      }
    }
    return { type: "object", properties, ...(required.length > 0 ? { required } : {}) };
  }
  return { type: "string" };
}

/**
 * OpenAI-compatible LLM adapter for x.ai Grok.
 *
 * Grok uses the standard /v1/chat/completions endpoint with tool calling.
 * No SDK dependency — plain fetch to keep the surface minimal.
 */
export function createGrokLlmAdapter(config: GrokLlmAdapterConfig): LlmAdapter {
  const baseUrl = config.baseUrl ?? "https://api.x.ai/v1";
  const maxRetries = config.maxRetries ?? 3;

  const openAiFunctions: OpenAIFunction[] = config.tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    parameters: zodToJsonSchema(tool.inputSchema),
  }));

  const openAiTools = openAiFunctions.map((fn) => ({
    type: "function" as const,
    function: fn,
  }));

  const history: OpenAIMessage[] = [];
  let lastToolCallId = "";

  return {
    async step({ system, messages }): Promise<LlmDecision<string>> {
      const last = messages[messages.length - 1];
      if (!last) throw new Error("GrokLlmAdapter: empty message history");

      if (messages.length === 1 && last.role === "user") {
        history.length = 0;
        history.push({ role: "user", content: last.content });
      } else if (last.role === "tool") {
        let payload: { tool: string; out: unknown };
        try {
          payload = JSON.parse(last.content) as { tool: string; out: unknown };
        } catch {
          throw new Error("GrokLlmAdapter: malformed tool message content");
        }
        history.push({
          role: "tool",
          content: JSON.stringify(payload.out ?? {}),
          tool_call_id: lastToolCallId,
        });
      } else {
        throw new Error(`GrokLlmAdapter: unexpected final message role "${last.role}"`);
      }

      const body = {
        model: config.model,
        messages: [{ role: "system", content: system }, ...history],
        tools: openAiTools.length > 0 ? openAiTools : undefined,
        tool_choice: openAiTools.length > 0 ? "auto" : undefined,
      };

      let responseJson: Record<string, unknown> | undefined;
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const res = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey}`,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errText = await res.text();
          const transient = TRANSIENT_RE.test(errText) || res.status === 429 || res.status >= 500;
          if (transient && attempt < maxRetries) {
            await sleep(1000 * 2 ** attempt);
            continue;
          }
          throw new Error(`Grok API error ${res.status}: ${errText}`);
        }

        responseJson = (await res.json()) as Record<string, unknown>;
        break;
      }

      if (!responseJson) throw new Error("GrokLlmAdapter: no response after retries");

      const choices = responseJson.choices as Array<{
        message: {
          role: string;
          content?: string | null;
          tool_calls?: Array<{
            id: string;
            type: string;
            function: { name: string; arguments: string };
          }>;
        };
      }>;

      const choice = choices?.[0];
      if (!choice) throw new Error("GrokLlmAdapter: no choices in response");

      const msg = choice.message;
      const toolCall = msg.tool_calls?.[0];

      if (toolCall) {
        lastToolCallId = toolCall.id;
        history.push({
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: toolCall.id,
              type: "function",
              function: toolCall.function,
            },
          ],
        });
        let args: unknown;
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          args = {};
        }
        return { toolCall: { name: toolCall.function.name, args } };
      }

      const text = msg.content ?? "";
      history.push({ role: "assistant", content: text });
      return { final: text };
    },
  };
}
