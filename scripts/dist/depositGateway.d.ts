import { type ScriptsConfig } from "./config.js";
/**
 * Deposit USDC into the Circle Gateway Wallet contract, then poll until
 * Circle's testnet pipeline credits the balance. Testnet credit takes
 * 13–19 minutes (see tutorials/pay-per-call-llm-nanopayments-tutorial.md
 * § Common Issues) — we poll every `pollIntervalMs`, bounded by
 * `DEPOSIT_TIMEOUT_MS` (default 25 min).
 */
export interface DepositGatewayClient {
    getBalances(): Promise<GatewayBalances>;
    deposit(amount: string): Promise<{
        depositTxHash?: string;
    }>;
}
export interface GatewayBalances {
    wallet: {
        formatted: string;
    };
    gateway: {
        formattedAvailable: string;
    };
}
export interface DepositGatewayDeps {
    config?: ScriptsConfig;
    client?: DepositGatewayClient;
    now?: () => number;
    sleep?: (ms: number) => Promise<void>;
    pollIntervalMs?: number;
}
export interface DepositGatewayResult {
    depositTxHash?: string;
    before: GatewayBalances;
    after: GatewayBalances;
}
export declare function runDepositGateway(deps?: DepositGatewayDeps): Promise<DepositGatewayResult>;
//# sourceMappingURL=depositGateway.d.ts.map