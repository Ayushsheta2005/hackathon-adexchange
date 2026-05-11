import type { AuctionResult } from "@ade/shared";
import type { CircleClient } from "@ade/wallets";
import type { Express } from "express";
import type { Logger } from "pino";
import type { AutoClearScheduler } from "../auction/autoClearScheduler.js";
import type { ResolvedPersona } from "../demo/runAgentAuction.js";
import type { EventBus } from "../events/bus.js";
import type { GatewayMiddlewareAdapter } from "../middleware/nanopayments.js";
import type { NonceStore } from "../nonces/store.js";
import type { ControlStore } from "../state/controlStore.js";
import type { BidStore, ListingStore, SettlementStore } from "../state/stores.js";
export interface RegisterRoutesDeps {
    listingStore: ListingStore;
    bidStore: BidStore;
    settlementStore: SettlementStore;
    nonceStore: NonceStore;
    eventBus: EventBus;
    rateLimitPerMin: number;
    circleClient: CircleClient | null;
    buyerWalletId: string | undefined;
    /** When present, POST /bid is gated on a sub-cent x402 nanopayment. */
    gateway?: GatewayMiddlewareAdapter;
    buyerWalletRouting?: ReadonlyMap<string, string>;
    demo?: {
        exchangeUrl: string;
        personas: ResolvedPersona[];
        gemini?: {
            apiKey: string;
            model: string;
        };
        buyerPrivateKey?: `0x${string}`;
        mode: "in_process" | "external";
    };
    autoClearScheduler: AutoClearScheduler;
    controlStore: ControlStore;
    assistantGemini: {
        apiKey: string;
        model: string;
    } | null;
    assistantRateLimitPerMin: number;
    fixtureAuctionReplay?: ReadonlyArray<AuctionResult>;
    /** Pino logger for assistant + route diagnostics (same instance as createApp). */
    logger: Logger;
}
export declare function registerRoutes(app: Express, deps: RegisterRoutesDeps): void;
//# sourceMappingURL=index.d.ts.map