import { z } from "zod";
import { AuctionResultSchema } from "./auction.js";
import { SettlementReceiptSchema } from "./settlement.js";
/** One chat turn from the UI (no system role — server adds instructions). */
export const AssistantChatMessageSchema = z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().min(1).max(4000),
});
export const DashboardListingSummarySchema = z.object({
    listingId: z.string().uuid(),
    floorPriceUsdc: z.string(),
    adType: z.string(),
    format: z.string(),
    sellerAgentId: z.string(),
});
export const DashboardBidSummarySchema = z.object({
    bidId: z.string().uuid(),
    bidAmountUsdc: z.string(),
    buyerAgentId: z.string(),
    /** BidRequest has no listing id; format/size hint targeting. */
    format: z.string(),
    size: z.string(),
});
/** Sanitized snapshot of exchange UI state for Atlas (no secrets). */
export const DashboardAssistantContextSchema = z.object({
    generatedAt: z.string().min(1),
    sseConnected: z.boolean(),
    demoPaused: z.boolean(),
    settlementCount: z.number().int().nonnegative(),
    listings: z.array(DashboardListingSummarySchema).max(30),
    bids: z.array(DashboardBidSummarySchema).max(60),
    recentAuctions: z.array(AuctionResultSchema).max(10),
    lastAuction: AuctionResultSchema.nullable(),
    lastReceipt: SettlementReceiptSchema.nullable(),
});
/** Role discriminator: lets the server pick the buyer vs seller system prompt. */
export const AssistantChatRoleSchema = z.enum(["buyer", "seller"]);
export const AssistantChatRequestSchema = z.object({
    messages: z.array(AssistantChatMessageSchema).min(1).max(40),
    context: DashboardAssistantContextSchema,
    /** Defaults to "buyer" so existing buyer clients keep working without sending the field. */
    role: AssistantChatRoleSchema.default("buyer"),
    /** Composer mode hint (e.g. "ask", "set_floor"). Server-side prompt may use this for shaping. */
    mode: z.string().min(1).max(40).optional(),
});
/** Metric row in a dashboard-style strip (exchange snapshot vs demo simulation). */
export const AssistantMetricItemSchema = z.object({
    label: z.string().min(1).max(40),
    value: z.string().min(1).max(72),
    dataSource: z.enum(["exchange", "simulated"]),
});
export const AssistantMetricsStripBlockSchema = z.object({
    type: z.literal("metrics_strip"),
    items: z.array(AssistantMetricItemSchema).min(1).max(8),
});
export const AssistantPillSchema = z.object({
    text: z.string().min(1).max(120),
    variant: z.enum(["new", "kept", "neutral"]),
});
export const AssistantPillGroupBlockSchema = z.object({
    type: z.literal("pill_group"),
    sectionTitle: z.string().min(1).max(32),
    pills: z.array(AssistantPillSchema).min(1).max(24),
});
export const AssistantRejectedAlternativeSchema = z.object({
    action: z.string().min(1).max(200),
    reason: z.string().min(1).max(240),
});
export const AssistantDecisionBlockSchema = z.object({
    type: z.literal("decision"),
    headline: z.string().min(1).max(160),
    summary: z.string().min(1).max(600),
    reasoning: z.array(z.string().min(1).max(420)).max(10),
    rejected: z.array(AssistantRejectedAlternativeSchema).max(8),
    complianceNote: z.string().min(1).max(300).optional(),
    badge: z.string().min(1).max(48).optional(),
});
/** One bar in a simple categorical bar chart (values are unitless counts or relative amounts for the demo). */
export const AssistantChartPointSchema = z.object({
    label: z.string().min(1).max(40),
    // Reason: Gemini often emits USDC amounts as JSON strings; strict z.number() dropped the whole bar_chart block.
    value: z.coerce.number().finite().nonnegative(),
});
export const AssistantBarChartBlockSchema = z.object({
    type: z.literal("bar_chart"),
    title: z.string().min(1).max(100),
    subtitle: z.string().min(1).max(200).optional(),
    /** Short axis hint shown near values (e.g. "USDC", "count"). */
    yCaption: z.string().min(1).max(24).optional(),
    points: z.array(AssistantChartPointSchema).min(1).max(14),
    dataSource: z.enum(["exchange", "simulated"]).default("exchange"),
});
export const AssistantUiBlockSchema = z.discriminatedUnion("type", [
    AssistantMetricsStripBlockSchema,
    AssistantPillGroupBlockSchema,
    AssistantDecisionBlockSchema,
    AssistantBarChartBlockSchema,
]);
export const AssistantChatResponseSchema = z.object({
    reply: z.string(),
    blocks: z.array(AssistantUiBlockSchema).max(5).optional(),
});
const AssistantChatResponseLooseSchema = z.object({
    reply: z.coerce.string(),
    blocks: z.array(z.unknown()).max(8).optional(),
});
/**
 * Parse model JSON tolerantly: keep `reply`, accept up to 5 valid blocks and drop invalid entries.
 */
export function parseAssistantChatResponse(input) {
    const root = AssistantChatResponseLooseSchema.safeParse(input);
    if (!root.success) {
        return { reply: "" };
    }
    const blocks = [];
    for (const raw of root.data.blocks ?? []) {
        const r = AssistantUiBlockSchema.safeParse(raw);
        if (r.success && blocks.length < 5) {
            blocks.push(r.data);
        }
    }
    const reply = root.data.reply.trim();
    return {
        reply: reply.length > 0 ? reply : "",
        blocks: blocks.length > 0 ? blocks : undefined,
    };
}
//# sourceMappingURL=assistant.js.map