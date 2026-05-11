import { Router } from "express";

import { runAgentAuction, type ResolvedPersona } from "../demo/runAgentAuction.js";
import type { ListingStore } from "../state/stores.js";

export interface DemoDeps {
  exchangeUrl: string;
  listingStore: ListingStore;
  personas: ResolvedPersona[];
  llmConfig?: { apiKey: string; model: string };
  buyerPrivateKey?: `0x${string}`;
}

export function createDemoRouter(deps: DemoDeps): Router {
  const router = Router();

  router.post("/demo/agent-run", async (_req, res, next) => {
    try {
      const missing: string[] = [];
      if (!deps.llmConfig) missing.push("XAI_API_KEY");
      if (deps.personas.length === 0) missing.push("BUYER_<persona>_WALLET_ID/_ADDRESS");
      if (missing.length > 0 || !deps.llmConfig) {
        res.status(503).json({ error: "demo_not_configured", missing });
        return;
      }
      const inventory = await deps.listingStore.list();
      if (inventory.length === 0) {
        res.status(422).json({ error: "no_inventory_available", hint: "Register an ad slot first" });
        return;
      }
      try {
        const result = await runAgentAuction({
          exchangeUrl: deps.exchangeUrl,
          listingStore: deps.listingStore,
          personas: deps.personas,
          llmConfig: deps.llmConfig,
          buyerPrivateKey: deps.buyerPrivateKey,
        });
        res.status(200).json(result);
      } catch (innerErr) {
        const msg = innerErr instanceof Error ? innerErr.message : String(innerErr);
        if (msg.includes("no_inventory_available") || msg.includes("no_eligible_bids")) {
          res.status(422).json({ error: msg });
        } else {
          res.status(500).json({ error: "agent_run_failed", detail: msg });
        }
      }
    } catch (err) {
      next(err);
    }
  });

  return router;
}
