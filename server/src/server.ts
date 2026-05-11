import { createCircleClient } from "@ade/wallets";

import { createApp } from "./app.js";
import { buildBuyerWalletRouting, loadServerConfig } from "./config.js";
import { resolvePersonasFromEnv } from "./demo/runAgentAuction.js";
import { buildFixtureAuctionReplay, seedDevUiStores } from "./fixtures/devUiSeed.js";
import { createLogger } from "./logger.js";
import { createGatewayAdapter, type GatewayMiddlewareAdapter } from "./middleware/nanopayments.js";
import { createDemoLoadRouter } from "./routes/demoLoadRoute.js";
import { createBidStore, createListingStore, createSettlementStore } from "./state/stores.js";

async function main(): Promise<void> {
  const config = loadServerConfig();
  const logger = createLogger(config.LOG_LEVEL);

  let circleClient = null;
  try {
    circleClient = createCircleClient({ env: process.env });
  } catch {
    logger.warn("Circle wallet config incomplete — POST /auction/run will store failed receipts");
  }

  let gateway: GatewayMiddlewareAdapter | undefined;
  const disableGate = process.env.DISABLE_PAYMENT_GATE === "true";
  if (config.SELLER_WALLET_ADDRESS && !disableGate) {
    gateway = createGatewayAdapter({
      sellerAddress: config.SELLER_WALLET_ADDRESS,
      facilitatorUrl: config.GATEWAY_FACILITATOR_URL,
    });
    logger.info({ sellerAddress: config.SELLER_WALLET_ADDRESS }, "gateway_nanopayments_enabled");
  } else {
    logger.warn(
      disableGate ? "DISABLE_PAYMENT_GATE=true — payment gate bypassed for demo load" : "SELLER_WALLET_ADDRESS not set — POST /bid has no payment gate"
    );
  }

  const buyerWalletRouting = buildBuyerWalletRouting(config);
  const personas = resolvePersonasFromEnv(process.env);
  const gemini = config.GEMINI_API_KEY
    ? { apiKey: config.GEMINI_API_KEY, model: config.GEMINI_MODEL ?? "gemini-2.5-flash" }
    : undefined;

  const assistantGemini = config.GEMINI_API_KEY
    ? { apiKey: config.GEMINI_API_KEY, model: config.GEMINI_MODEL ?? "gemini-2.5-flash" }
    : null;

  const listingStore = createListingStore();
  const bidStore = createBidStore();
  const settlementStore = createSettlementStore();

  let fixtureAuctionReplay = config.uiFixtureSeedEnabled ? buildFixtureAuctionReplay() : [];
  if (config.uiFixtureSeedEnabled) {
    await seedDevUiStores({ listingStore, bidStore, settlementStore, logger });
    logger.warn(
      { replay: fixtureAuctionReplay.length },
      "UI_FIXTURE_SEED enabled — in-memory demo data loaded; do not use in production",
    );
  } else {
    fixtureAuctionReplay = [];
  }

  const { app, listingStore: appListingStore, bidStore: appBidStore, settlementStore: appSettlementStore, eventBus } = createApp({
    corsAllowOrigins: config.CORS_ALLOW_ORIGINS,
    bidRateLimitPerMin: config.BID_RATE_LIMIT_PER_MIN,
    assistantGemini,
    assistantRateLimitPerMin: config.ASSISTANT_CHAT_RATE_LIMIT_PER_MIN,
    circleClient,
    buyerWalletId: config.BUYER_WALLET_ID,
    gateway,
    buyerWalletRouting,
    listingStore,
    bidStore,
    settlementStore,
    fixtureAuctionReplay,
    demo: {
      exchangeUrl: `http://localhost:${config.PORT}`,
      personas,
      gemini,
      // Only pass the private key when the payment gate is active.
      // When DISABLE_PAYMENT_GATE=true, agents use plain fetch (no signing).
      buyerPrivateKey: disableGate
        ? undefined
        : (config.BUYER_PRIVATE_KEY as `0x${string}` | undefined),
      mode: config.DEMO_MODE,
    },
    autoClearDelayMs: config.AUCTION_AUTO_CLEAR_DELAY_MS,
    logger,
  });

  // Mount the in-process demo load route (no terminal needed).
  if (config.SELLER_WALLET_ADDRESS && config.BUYER_WALLET_ID) {
    app.use(
      createDemoLoadRouter({
        listingStore: appListingStore,
        bidStore: appBidStore,
        settlementStore: appSettlementStore,
        eventBus,
        circleClient,
        buyerWalletId: config.BUYER_WALLET_ID,
        buyerWalletRouting,
        sellerWalletAddress: config.SELLER_WALLET_ADDRESS,
        buyerWalletAddress: config.BUYER_WALLET_ADDRESS ?? config.BUYER_LUXURYCO_WALLET_ADDRESS ?? "",
      }),
    );
  }

  app.listen(config.PORT, () => {
    logger.info(
      {
        port: config.PORT,
        env: config.NODE_ENV,
        corsAllowOrigins: config.CORS_ALLOW_ORIGINS,
        gatewayEnabled: Boolean(gateway),
        personaWallets: buyerWalletRouting.size,
        demoEnabled: Boolean(gemini && personas.length > 0),
        demoMode: config.DEMO_MODE,
        autoClearDelayMs: config.AUCTION_AUTO_CLEAR_DELAY_MS,
        uiFixtureSeed: config.uiFixtureSeedEnabled,
      },
      "exchange_server_listening",
    );
  });
}

void main().catch((err: unknown) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
