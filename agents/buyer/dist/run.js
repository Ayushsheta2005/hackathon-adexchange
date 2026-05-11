import { AdInventoryListingSchema } from "@ade/shared";
import { loadBuyerConfig } from "./config.js";
import { createBuyerAgentWithGemini } from "./index.js";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/**
 * Returns true only when the exchange explicitly reports `{ paused: true }`.
 * Any error (network blip, 5xx) is treated as "running" — a fail-open default
 * keeps the demo agent loop moving when the control endpoint is briefly
 * unreachable rather than silently halting all bidding.
 */
async function isPaused(fetcher, exchangeUrl) {
    try {
        const res = await fetcher(`${exchangeUrl}/control/state`, { method: "GET" });
        if (!res.ok)
            return false;
        const json = (await res.json());
        return json?.paused === true;
    }
    catch {
        return false;
    }
}
function buildPrompt(config, listing) {
    return [
        "Sealed-bid second-price auction. Other buyers will bid blind too.",
        "",
        `You are an autonomous buying agent for ${config.BUYER_AGENT_BRAND}.`,
        `Mission: ${config.BUYER_AGENT_STRATEGY}`,
        `Bid range: $${config.BUYER_AGENT_MIN_BID_USDC} – $${config.BUYER_AGENT_MAX_BID_USDC} USDC per impression.`,
        `Preferred tags: ${config.BUYER_AGENT_PREFERRED_TAGS.join(", ")}.`,
        "",
        `Listing #${listing.listingId.slice(0, 8)} — ${listing.format} ${listing.size}, floor $${listing.floorPriceUsdc}`,
        "",
        "Call placeBid with:",
        `- targeting.adType: "${listing.adType}"`,
        `- targeting.format: "${listing.format}"`,
        `- targeting.size: "${listing.size}"`,
        "- targeting.contextTags: choose the subset of your preferred tags that matches the listing.",
        `- bidAmountUsdc: a value within your range $${config.BUYER_AGENT_MIN_BID_USDC}–$${config.BUYER_AGENT_MAX_BID_USDC}.`,
        `- budgetRemainingUsdc: "1.000".`,
    ].join("\n");
}
export async function runBuyer(deps = {}) {
    const config = deps.config ?? loadBuyerConfig();
    const fetcher = deps.fetchImpl ?? fetch;
    const sleepFn = deps.sleepImpl ?? sleep;
    const log = deps.log ??
        ((msg, meta) => 
        // eslint-disable-next-line no-console
        console.log(`[${config.BUYER_AGENT_ID}] ${msg}`, meta ?? {}));
    const agent = deps.agent ?? createBuyerAgentWithGemini({ config });
    const seenListings = new Set();
    let cycles = 0;
    let bids = 0;
    while (deps.maxCycles === undefined || cycles < deps.maxCycles) {
        cycles++;
        try {
            // Pause check first: skip the whole cycle (no Gemini call, no
            // /inventory poll) when the demo is paused. On error we treat it as
            // "running" — better to bid wastefully than to silently halt.
            if (await isPaused(fetcher, config.EXCHANGE_API_URL)) {
                log("cycle_paused", { agentId: config.BUYER_AGENT_ID });
            }
            else {
                const res = await fetcher(`${config.EXCHANGE_API_URL}/inventory`, { method: "GET" });
                if (!res.ok) {
                    log("inventory_fetch_failed", { status: res.status });
                }
                else {
                    const json = (await res.json());
                    const items = Array.isArray(json) ? json : json.items;
                    const listings = AdInventoryListingSchema.array().parse(items);
                    const target = listings.find((l) => !seenListings.has(l.listingId));
                    if (target) {
                        const result = await agent.run(buildPrompt(config, target));
                        // Reason: only mark seen after agent.run() returns. If it throws
                        // (Gemini 503, network blip), the next cycle re-tries this listing
                        // instead of permanently skipping it.
                        seenListings.add(target.listingId);
                        const placed = result.toolCalls.includes("placeBid");
                        if (placed)
                            bids++;
                        log("cycle_done", {
                            listingId: target.listingId,
                            iterations: result.iterations,
                            toolCalls: result.toolCalls,
                            placed,
                        });
                    }
                }
            }
        }
        catch (e) {
            log("cycle_error", { error: e.message });
        }
        await sleepFn(config.BUYER_POLL_INTERVAL_MS);
    }
    return { cycles, bids };
}
const isEntry = typeof process !== "undefined" &&
    typeof process.argv[1] === "string" &&
    import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isEntry) {
    runBuyer().catch((err) => {
        // eslint-disable-next-line no-console
        console.error("[buyer:run] fatal:", err);
        process.exit(1);
    });
}
//# sourceMappingURL=run.js.map