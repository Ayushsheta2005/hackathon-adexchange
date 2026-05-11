import { createCircleClient } from "@ade/wallets";
import { assertTestnet, loadScriptsConfig } from "./config.js";
import { banner, log } from "./logger.js";
export async function runFundWallets(deps = {}) {
    const config = deps.config ?? loadScriptsConfig();
    assertTestnet(config);
    if (!config.BUYER_WALLET_ID || !config.SELLER_WALLET_ID) {
        banner("Fund Wallets — wallets not yet created", [
            "BUYER_WALLET_ID and/or SELLER_WALLET_ID are empty in .env.local.",
            "Run `pnpm --filter @ade/scripts create:wallets <wallet-set-id>` first,",
            "then re-run this script.",
        ]);
        return { skipped: true };
    }
    const client = deps.client ?? createCircleClient({ env: process.env });
    log("Fetching balances", {
        buyerWalletId: config.BUYER_WALLET_ID,
        sellerWalletId: config.SELLER_WALLET_ID,
    });
    const buyer = await client.getBalance(config.BUYER_WALLET_ID);
    const seller = await client.getBalance(config.SELLER_WALLET_ID);
    banner("Fund Wallets", [
        "Circle's testnet faucet is a human-only web form:",
        "  1) Open https://faucet.circle.com",
        "  2) Select ARC Testnet",
        "  3) Paste the buyer and seller wallet addresses (below)",
        "  4) Request USDC — 0.20 USDC per wallet covers the demo",
        "",
        "Current balances:",
        `  Buyer  ${buyer.usdc.padEnd(10)} USDC   wallet=${maskWalletId(config.BUYER_WALLET_ID)}`,
        `  Seller ${seller.usdc.padEnd(10)} USDC   wallet=${maskWalletId(config.SELLER_WALLET_ID)}`,
    ]);
    return { skipped: false, buyer, seller };
}
/**
 * Reduce a Circle wallet id to a short visual fingerprint. We don't log full
 * wallet ids to stdout because they're stable handles to funds — masking
 * cuts shoulder-surfing risk while still letting the operator distinguish
 * two wallets at a glance.
 */
function maskWalletId(walletId) {
    if (walletId.length <= 10)
        return walletId;
    return `${walletId.slice(0, 6)}…${walletId.slice(-4)}`;
}
const isEntry = typeof process !== "undefined" &&
    typeof process.argv[1] === "string" &&
    import.meta.url === new URL(`file://${process.argv[1]}`).href;
if (isEntry) {
    runFundWallets().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
//# sourceMappingURL=fundWallets.js.map