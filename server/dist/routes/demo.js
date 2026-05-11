import { Router } from "express";
import { runAgentAuction } from "../demo/runAgentAuction.js";
export function createDemoRouter(deps) {
    const router = Router();
    router.post("/demo/agent-run", async (_req, res, next) => {
        try {
            const missing = [];
            if (!deps.gemini)
                missing.push("GEMINI_API_KEY");
            if (deps.personas.length === 0)
                missing.push("BUYER_<persona>_WALLET_ID/_ADDRESS");
            if (missing.length > 0 || !deps.gemini) {
                res.status(503).json({ error: "demo_not_configured", missing });
                return;
            }
            // Surface "no inventory" as a 422 so the UI can prompt the user to
            // register a listing first instead of showing a generic 500.
            const inventory = await deps.listingStore.list();
            if (inventory.length === 0) {
                res
                    .status(422)
                    .json({ error: "no_inventory_available", hint: "Register an ad slot first" });
                return;
            }
            const result = await runAgentAuction({
                exchangeUrl: deps.exchangeUrl,
                listingStore: deps.listingStore,
                personas: deps.personas,
                gemini: deps.gemini,
                buyerPrivateKey: deps.buyerPrivateKey,
            });
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    });
    return router;
}
//# sourceMappingURL=demo.js.map