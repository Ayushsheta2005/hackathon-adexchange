import type { AssistantChatMessage, AssistantChatResponse, AssistantChatRole, DashboardAssistantContext } from "@ade/shared";
import type { Logger } from "pino";
export interface GeminiReplyDeps {
    apiKey: string;
    model: string;
    /** When set, logs Gemini phases (use LOG_LEVEL=debug to see debug lines). */
    logger?: Logger;
}
/** Optional shaping inputs forwarded from the route. */
export interface GeminiReplyShape {
    /** Defaults to "buyer" so existing buyer call sites keep working. */
    role?: AssistantChatRole;
    /** Composer mode hint (e.g. "ask", "set_floor"); only used when role === "seller". */
    mode?: string;
}
/**
 * Stateless turn: full message history + context in one prompt (UI resends history each call).
 * Returns structured reply + optional UI blocks (validated with shared zod helpers).
 */
export declare function generateAssistantReply(deps: GeminiReplyDeps, messages: AssistantChatMessage[], context: DashboardAssistantContext, shape?: GeminiReplyShape): Promise<AssistantChatResponse>;
//# sourceMappingURL=geminiReply.d.ts.map