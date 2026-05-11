import { type BalanceSnapshot, type CircleClient } from "@ade/wallets";
import { type ScriptsConfig } from "./config.js";
/**
 * Circle's testnet faucet is a human-only web form, so this script can't
 * actually move USDC — it prints the manual-step banner *and* reports the
 * current buyer/seller balances so the operator can verify funding landed.
 */
export interface FundWalletsDeps {
    config?: ScriptsConfig;
    client?: CircleClient;
}
export interface FundWalletsSummary {
    skipped: boolean;
    buyer?: BalanceSnapshot;
    seller?: BalanceSnapshot;
}
export declare function runFundWallets(deps?: FundWalletsDeps): Promise<FundWalletsSummary>;
//# sourceMappingURL=fundWallets.d.ts.map