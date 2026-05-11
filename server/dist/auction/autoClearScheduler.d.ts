import type { Logger } from "pino";
import type { RunAuctionOutcome } from "./runAuction.js";
export interface AutoClearSchedulerDeps {
    /**
     * Milliseconds between `listingStore.add()` and the auto-clear fire.
     * 0 (or negative) disables the scheduler — `schedule()` becomes a no-op.
     */
    delayMs: number;
    /** Injected runAuction binding so the scheduler stays unit-testable. */
    runAuction: (listingId: string) => Promise<RunAuctionOutcome>;
    logger: Logger;
    /**
     * Pause predicate. When it returns true at fire-time, the scheduler skips
     * the runAuction call (logs at debug). Defaults to "never paused".
     */
    isPaused?: () => boolean;
}
export interface AutoClearScheduler {
    /** Idempotent: clears any prior timer for this id, then queues a fresh one. */
    schedule(listingId: string): void;
    /** Cancel a pending timer. Safe if no timer is pending for this id. */
    cancel(listingId: string): void;
    /** Test/server-stop hook: clears every pending timer. */
    shutdown(): void;
    /** Test introspection. */
    pendingCount(): number;
}
export declare function createAutoClearScheduler(deps: AutoClearSchedulerDeps): AutoClearScheduler;
//# sourceMappingURL=autoClearScheduler.d.ts.map