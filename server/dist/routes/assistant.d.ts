import type { AssistantChatMessage, AssistantChatResponse, AssistantChatRole, DashboardAssistantContext } from "@ade/shared";
import { Router } from "express";
import type { Logger } from "pino";
export interface AssistantReplyShape {
    role: AssistantChatRole;
    mode?: string;
}
export type AssistantReplyGenerator = (messages: AssistantChatMessage[], context: DashboardAssistantContext, shape: AssistantReplyShape) => Promise<AssistantChatResponse>;
export interface AssistantRouterDeps {
    gemini: {
        apiKey: string;
        model: string;
    } | null;
    rateLimitPerMin: number;
    /** Tests: bypass Gemini and return a fixed payload. */
    replyGenerator?: AssistantReplyGenerator;
    logger: Logger;
}
export declare function createAssistantRouter(deps: AssistantRouterDeps): Router;
//# sourceMappingURL=assistant.d.ts.map