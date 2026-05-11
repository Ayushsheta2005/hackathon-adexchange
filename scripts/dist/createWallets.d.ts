import { type CircleClient, type WalletRef } from "@ade/wallets";
import { type ScriptsConfig } from "./config.js";
/**
 * Create buyer + seller Developer-Controlled wallets on Arc testnet. Prints
 * a copy-into-.env banner so the operator can paste the ids/addresses into
 * `.env.local` before `fund:wallets` / `deposit:gateway` / `demo:load`.
 */
export interface CreateWalletsDeps {
    config?: ScriptsConfig;
    client?: CircleClient;
    walletSetIdOverride?: string;
}
export interface CreateWalletsResult {
    buyer: WalletRef;
    seller: WalletRef;
}
export declare function runCreateWallets(deps?: CreateWalletsDeps): Promise<CreateWalletsResult>;
//# sourceMappingURL=createWallets.d.ts.map