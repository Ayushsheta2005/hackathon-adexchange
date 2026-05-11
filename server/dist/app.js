import express from "express";
import { createAutoClearScheduler } from "./auction/autoClearScheduler.js";
import { runAuction } from "./auction/runAuction.js";
import { createEventBus } from "./events/bus.js";
import { logger as defaultLogger } from "./logger.js";
import { createCorsMiddleware } from "./middleware/corsAllowList.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { createInMemoryNonceStore } from "./nonces/store.js";
import { registerRoutes } from "./routes/index.js";
import { createControlStore } from "./state/controlStore.js";
import { createBidStore, createListingStore, createSettlementStore, } from "./state/stores.js";
/**
 * Pure Express app factory. No listen(); no process.env reads. Dependency
 * injection points let tests swap each store for a fresh in-memory instance.
 */
export function createApp(deps) {
    const app = express();
    const listingStore = deps.listingStore ?? createListingStore();
    const bidStore = deps.bidStore ?? createBidStore();
    const settlementStore = deps.settlementStore ?? createSettlementStore();
    const nonceStore = deps.nonceStore ?? createInMemoryNonceStore();
    const eventBus = deps.eventBus ?? createEventBus();
    const controlStore = deps.controlStore ?? createControlStore();
    const log = deps.logger ?? defaultLogger;
    const autoClearScheduler = deps.autoClearScheduler ??
        createAutoClearScheduler({
            delayMs: deps.autoClearDelayMs ?? 0,
            runAuction: (id) => runAuction(id, {
                listingStore,
                bidStore,
                settlementStore,
                eventBus,
                circleClient: deps.circleClient ?? null,
                buyerWalletId: deps.buyerWalletId,
                buyerWalletRouting: deps.buyerWalletRouting,
            }),
            logger: log,
            isPaused: () => controlStore.isPaused(),
        });
    app.disable("x-powered-by");
    app.use(createCorsMiddleware(deps.corsAllowOrigins));
    app.use(express.json({ limit: "64kb" }));
    registerRoutes(app, {
        listingStore,
        bidStore,
        settlementStore,
        nonceStore,
        eventBus,
        rateLimitPerMin: deps.bidRateLimitPerMin,
        circleClient: deps.circleClient ?? null,
        buyerWalletId: deps.buyerWalletId,
        gateway: deps.gateway,
        buyerWalletRouting: deps.buyerWalletRouting,
        demo: deps.demo,
        autoClearScheduler,
        controlStore,
        assistantGemini: deps.assistantGemini ?? null,
        assistantRateLimitPerMin: deps.assistantRateLimitPerMin ?? 30,
        fixtureAuctionReplay: deps.fixtureAuctionReplay,
        logger: log,
    });
    app.use(errorHandler);
    return {
        app,
        listingStore,
        bidStore,
        settlementStore,
        nonceStore,
        eventBus,
        autoClearScheduler,
        controlStore,
    };
}
//# sourceMappingURL=app.js.map