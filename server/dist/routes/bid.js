import { BidRequestSchema } from "@ade/shared";
import { Router } from "express";
import { createPauseGuard } from "../middleware/pauseGuard.js";
import { createBidRateLimiter } from "../middleware/rateLimit.js";
const passThrough = (_req, _res, next) => next();
export function createBidRouter(deps) {
    const router = Router();
    const paymentGate = deps.gateway?.require("$0.001") ?? passThrough;
    const pauseGate = createPauseGuard(deps.controlStore);
    router.get("/bids", async (_req, res, next) => {
        try {
            const items = await deps.bidStore.list();
            res.json({ items });
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/bid", pauseGate, createBidRateLimiter(deps.rateLimitPerMin), paymentGate, async (req, res, next) => {
        try {
            const bid = BidRequestSchema.parse(req.body);
            const claimed = await deps.nonceStore.claim(bid.buyerWallet, bid.nonce);
            if (!claimed) {
                res.status(409).json({ error: "nonce_reused" });
                return;
            }
            await deps.bidStore.add(bid);
            res.status(202).json({ bidId: bid.bidId });
        }
        catch (err) {
            next(err);
        }
    });
    return router;
}
//# sourceMappingURL=bid.js.map