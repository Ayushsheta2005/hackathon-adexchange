import { type CircleClient } from "@ade/wallets";
import { type ScriptsConfig } from "./config.js";
/**
 * Create a Circle Developer-Controlled wallet set (idempotent against
 * `WALLET_SET_ID`). Prints a copy-into-.env banner with the id. Never logs
 * the Circle entity secret or API key — `log()` redacts those keys.
 */
export interface CreateWalletSetDeps {
    config?: ScriptsConfig;
    client?: CircleClient;
}
export interface CreateWalletSetResult {
    walletSetId: string;
    created: boolean;
}
export declare function runCreateWalletSet(deps?: CreateWalletSetDeps): Promise<CreateWalletSetResult>;
//# sourceMappingURL=createWalletSet.d.ts.map