import { randomUUID } from "node:crypto";
import { AssistantChatRequestSchema } from "@ade/shared";
import { Router } from "express";
import { generateAssistantReply } from "../assistant/geminiReply.js";
import { createAssistantRateLimiter } from "../middleware/rateLimit.js";
const DEFAULT_ASSISTANT_RL = 30;
/** Serialize Gemini so rapid consecutive assistant requests do not overlap generateContent. */
let assistantGenerationSerialTail = Promise.resolve();
function runAssistantGenerationSerialised(task) {
    const run = assistantGenerationSerialTail.then(() => task());
    assistantGenerationSerialTail = run.then(() => undefined, () => undefined);
    return run;
}
export function createAssistantRouter(deps) {
    const router = Router();
    const limit = createAssistantRateLimiter(deps.rateLimitPerMin || DEFAULT_ASSISTANT_RL);
    router.post("/assistant/chat", limit, async (req, res, next) => {
        const log = deps.logger.child({ route: "POST /assistant/chat" });
        try {
            const parsed = AssistantChatRequestSchema.safeParse(req.body);
            if (!parsed.success) {
                res.status(400).json({
                    error: "invalid_request",
                    code: "invalid_request",
                    details: parsed.error.flatten(),
                });
                return;
            }
            const { messages, context, role, mode } = parsed.data;
            const last = messages[messages.length - 1];
            if (!last || last.role !== "user") {
                res.status(400).json({ error: "last_message_must_be_user", code: "invalid_request" });
                return;
            }
            if (!deps.replyGenerator && !deps.gemini) {
                log.debug("assistant_chat_skipped_gemini_not_configured");
                res.status(503).json({
                    error: "assistant_unavailable",
                    code: "gemini_not_configured",
                });
                return;
            }
            const t0 = Date.now();
            const rid = randomUUID();
            const lastPreview = last.content.length > 140 ? `${last.content.slice(0, 140)}…` : last.content;
            log.info({
                requestId: rid,
                messageTurns: messages.length,
                contextGeneratedAt: context.generatedAt,
                lastUserPreview: lastPreview,
                generator: deps.replyGenerator != null ? "stub" : "gemini",
                role,
                composerMode: mode,
            }, "assistant_chat_start");
            try {
                const geminiCfg = deps.gemini;
                const shape = { role, mode };
                const payload = await runAssistantGenerationSerialised(() => deps.replyGenerator != null
                    ? deps.replyGenerator(messages, context, shape)
                    : generateAssistantReply({ apiKey: geminiCfg.apiKey, model: geminiCfg.model, logger: deps.logger }, messages, context, shape));
                log.info({
                    requestId: rid,
                    durationMs: Date.now() - t0,
                    replyChars: payload.reply.length,
                    blockCount: payload.blocks?.length ?? 0,
                }, "assistant_chat_ok");
                res.json(payload);
            }
            catch (err) {
                log.warn({
                    err,
                    requestId: rid,
                    durationMs: Date.now() - t0,
                    messageTurns: messages.length,
                    lastUserPreview: lastPreview,
                }, "assistant_chat_model_error");
                res.status(502).json({ error: "model_error", code: "model_error" });
            }
        }
        catch (err) {
            next(err);
        }
    });
    return router;
}
//# sourceMappingURL=assistant.js.map