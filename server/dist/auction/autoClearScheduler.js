export function createAutoClearScheduler(deps) {
    const timers = new Map();
    function schedule(listingId) {
        if (deps.delayMs <= 0)
            return;
        const prev = timers.get(listingId);
        if (prev)
            clearTimeout(prev);
        const handle = setTimeout(() => {
            // Reason: setTimeout cannot await an async callback, so we wrap in IIFE
            // and catch every rejection. A background-task uncaught rejection would
            // crash the process under Node's --unhandled-rejections=throw default.
            void (async () => {
                try {
                    if (deps.isPaused?.()) {
                        deps.logger.debug({ listingId }, "auto_clear_skipped_paused");
                        return;
                    }
                    const outcome = await deps.runAuction(listingId);
                    switch (outcome.kind) {
                        case "listing_not_found":
                            deps.logger.debug({ listingId }, "auto_clear_skipped_listing_gone");
                            break;
                        case "no_eligible_bids":
                            deps.logger.info({ listingId }, "auto_clear_skipped_no_eligible_bids");
                            break;
                        case "settled":
                            deps.logger.info({
                                listingId,
                                clearingPriceUsdc: outcome.auctionResult.clearingPriceUsdc,
                                status: outcome.receipt.status,
                            }, "auto_clear_settled");
                            break;
                    }
                }
                catch (err) {
                    deps.logger.error({ err, listingId }, "auto_clear_failed");
                }
                finally {
                    timers.delete(listingId);
                }
            })();
        }, deps.delayMs);
        // Reason: don't keep the event loop alive just for a stray scheduled timer
        // (e.g. a leaked test instance). Express's listener keeps the loop alive
        // in production regardless.
        handle.unref?.();
        timers.set(listingId, handle);
    }
    function cancel(listingId) {
        const handle = timers.get(listingId);
        if (!handle)
            return;
        clearTimeout(handle);
        timers.delete(listingId);
    }
    function shutdown() {
        for (const handle of timers.values())
            clearTimeout(handle);
        timers.clear();
    }
    function pendingCount() {
        return timers.size;
    }
    return { schedule, cancel, shutdown, pendingCount };
}
//# sourceMappingURL=autoClearScheduler.js.map