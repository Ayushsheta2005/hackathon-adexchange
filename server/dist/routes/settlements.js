import { Router } from "express";
export function createSettlementRouter(deps) {
    const router = Router();
    router.get("/settlements", async (_req, res, next) => {
        try {
            const items = await deps.settlementStore.list();
            res.json({ items });
        }
        catch (err) {
            next(err);
        }
    });
    return router;
}
//# sourceMappingURL=settlements.js.map