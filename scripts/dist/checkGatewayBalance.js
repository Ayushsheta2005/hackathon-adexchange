import { loadRootEnv } from "@ade/shared/env";
import { GatewayClient } from "@circle-fin/x402-batching/client";
loadRootEnv();
const privateKey = process.env.BUYER_PRIVATE_KEY;
const chain = (process.env.BUYER_CHAIN ?? "arcTestnet");
const client = new GatewayClient({ chain, privateKey });
console.log("Buyer address:", client.address);
const bal = await client.getBalances();
console.log("Wallet USDC:", bal.wallet.formatted);
console.log("Gateway available:", bal.gateway.formattedAvailable);
console.log("Gateway total:", bal.gateway.formattedTotal);
//# sourceMappingURL=checkGatewayBalance.js.map