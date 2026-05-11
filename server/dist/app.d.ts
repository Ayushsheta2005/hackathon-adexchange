import type { AuctionResult } from "@ade/shared";
import type { CircleClient } from "@ade/wallets";
import { type Express } from "express";
import type { Logger } from "pino";
import { type AutoClearScheduler } from "./auction/autoClearScheduler.js";
import { type EventBus } from "./events/bus.js";
import type { GatewayMiddlewareAdapter } from "./middleware/nanopayments.js";
import { type NonceStore } from "./nonces/store.js";
import { type ControlStore } from "./state/controlStore.js";
import { type BidStore, type ListingStore, type SettlementStore } from "./state/stores.js";
export interface AppDeps {
    corsAllowOrigins: readonly string[];
    bidRateLimitPerMin: number;
    listingStore?: ListingStore;
    bidStore?: BidStore;
    settlementStore?: SettlementStore;
    nonceStore?: NonceStore;
    eventBus?: EventBus;
    /** Injected in production; null in tests that don't exercise settlement. */
    circleClient?: CircleClient | null;
    buyerWalletId?: string;
    /** When present, POST /bid is gated on a sub-cent x402 nanopayment. */
    gateway?: GatewayMiddlewareAdapter;
    /**
     * Optional address-keyed Circle wallet id map. When the winning bid's
     * `buyerWallet` matches a key here, settlement uses that wallet; otherwise
     * the route falls back to `buyerWalletId`.
     */
    buyerWalletRouting?: ReadonlyMap<string, string>;
    /**
     * Optional self-contained agent-demo dependencies. When set, the server
     * exposes POST /demo/agent-run which runs buyer agents against an existing
     * listing in inventory (seller registration is a separate UI flow).
     */
    demo?: {
        exchangeUrl: string;
        personas: import("./demo/runAgentAuction.js").ResolvedPersona[];
        gemini?: {
            apiKey: string;
            model: string;
        };
        /**
         * Shared EOA private key used by GatewayClient to sign x402 payment
         * authorizations for every persona's bid in the demo cycle. When absent,
         * bids fall through to plain fetch and will be rejected by the gateway
         * middleware on /bid (402). Reason: Circle DCWs don't expose private keys,
         * so demo bid-fees use one shared EOA while settlement still routes per
         * persona via buyerWalletRouting. See features/x402-bid-middleware.md.
         */
        buyerPrivateKey?: `0x${string}`;
        /**
         * "in_process": mount POST /demo/agent-run; the in-server orchestrator
         * drives auctions. "external": leave the demo router unmounted so the
         * standalone Railway agent services own auction generation (avoids
         * double-bidding when both drivers run against the same exchange).
         */
        mode: "in_process" | "external";
    };
    /**
     * Milliseconds between `POST /inventory` and the auto-clear timer firing
     * for that listing. 0 disables auto-clear; manual button still works.
     * Defaults to 0 inside `createApp` so tests that don't opt in are unaffected.
     */
    autoClearDelayMs?: number;
    /** Optional pre-built scheduler — tests can inject a stub. */
    autoClearScheduler?: AutoClearScheduler;
    /** Optional pre-built control store — tests can inject one to start paused. */
    controlStore?: ControlStore;
    /** Falls back to the package-level pino default when omitted. */
    logger?: Logger;
    /** When null, POST /assistant/chat returns 503 gemini_not_configured. */
    assistantGemini?: {
        apiKey: string;
        model: string;
    } | null;
    assistantRateLimitPerMin?: number;
    /** Synthetic `auctionMatched` rows replayed on each SSE connect (dev fixtures). */
    fixtureAuctionReplay?: ReadonlyArray<AuctionResult>;
}
export interface AppHandles {
    app: Express;
    listingStore: ListingStore;
    bidStore: BidStore;
    settlementStore: SettlementStore;
    nonceStore: NonceStore;
    eventBus: EventBus;
    /** Exposed so tests / a graceful-shutdown hook can clear pending timers. */
    autoClearScheduler: AutoClearScheduler;
    /** Pause/resume control state. Read by gates + agent /control/state polls. */
    controlStore: ControlStore;
}
/**
 * Pure Express app factory. No listen(); no process.env reads. Dependency
 * injection points let tests swap each store for a fresh in-memory instance.
 */
export declare function createApp(deps: AppDeps): AppHandles;
//# sourceMappingURL=app.d.ts.map