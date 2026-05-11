import type { AuctionResult } from "@ade/shared";
import { Router } from "express";
import type { EventBus } from "../events/bus.js";
export interface StreamDeps {
    eventBus: EventBus;
    /** Dev-only: emit these `auctionMatched` payloads immediately after `connected`. */
    fixtureAuctionReplay?: ReadonlyArray<AuctionResult>;
}
/**
 * Server-Sent Events endpoint. The UI subscribes via EventSource to drive
 * the live transaction counter and auction feed.
 *
 * Emits a `connected` event immediately so the UI can prove subscription
 * without waiting for the first real auction.
 */
export declare function createStreamRouter(deps: StreamDeps): Router;
//# sourceMappingURL=stream.d.ts.map