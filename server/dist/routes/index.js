import { createAssistantRouter } from "./assistant.js";
import { createAuctionRouter } from "./auction.js";
import { createBidRouter } from "./bid.js";
import { createControlRouter } from "./control.js";
import { createDemoRouter } from "./demo.js";
import { createHealthRouter } from "./health.js";
import { createInventoryRouter } from "./inventory.js";
import { createSettlementRouter } from "./settlements.js";
import { createStreamRouter } from "./stream.js";
export function registerRoutes(app, deps) {
    app.use(createHealthRouter());
    app.use(createAssistantRouter({
        gemini: deps.assistantGemini,
        rateLimitPerMin: deps.assistantRateLimitPerMin,
        logger: deps.logger,
    }));
    app.use(createInventoryRouter({
        listingStore: deps.listingStore,
        autoClearScheduler: deps.autoClearScheduler,
        controlStore: deps.controlStore,
    }));
    app.use(createBidRouter({
        bidStore: deps.bidStore,
        nonceStore: deps.nonceStore,
        rateLimitPerMin: deps.rateLimitPerMin,
        gateway: deps.gateway,
        controlStore: deps.controlStore,
    }));
    app.use(createAuctionRouter({
        listingStore: deps.listingStore,
        bidStore: deps.bidStore,
        settlementStore: deps.settlementStore,
        eventBus: deps.eventBus,
        circleClient: deps.circleClient,
        buyerWalletId: deps.buyerWalletId,
        buyerWalletRouting: deps.buyerWalletRouting,
        autoClearScheduler: deps.autoClearScheduler,
        controlStore: deps.controlStore,
    }));
    app.use(createSettlementRouter({ settlementStore: deps.settlementStore }));
    app.use(createStreamRouter({
        eventBus: deps.eventBus,
        fixtureAuctionReplay: deps.fixtureAuctionReplay,
    }));
    app.use(createControlRouter({ controlStore: deps.controlStore, eventBus: deps.eventBus }));
    if (deps.demo && deps.demo.mode === "in_process") {
        // Reason: when DEMO_MODE=external, standalone Railway agent services own
        // auction generation. Mounting the demo router here would risk
        // double-bidding (one bid from the in-process orchestrator + one from the
        // external buyer service per persona).
        app.use(createDemoRouter({
            exchangeUrl: deps.demo.exchangeUrl,
            listingStore: deps.listingStore,
            personas: deps.demo.personas,
            gemini: deps.demo.gemini,
            buyerPrivateKey: deps.demo.buyerPrivateKey,
        }));
    }
}
//# sourceMappingURL=index.js.map