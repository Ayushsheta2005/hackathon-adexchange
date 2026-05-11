import { createGatewayMiddleware } from "@circle-fin/x402-batching/server";
export function createGatewayAdapter(config) {
    const gateway = createGatewayMiddleware({
        sellerAddress: config.sellerAddress,
        // Restrict to Arc testnet only. Buyers must hold a Gateway deposit on this
        // chain. CAIP-2 network ID for Arc testnet (chainId 5042002).
        networks: "eip155:5042002",
        facilitatorUrl: config.facilitatorUrl ?? "https://gateway-api-testnet.circle.com",
        description: "Ad impression bid — Agentic Ad Exchange",
    });
    return {
        require(priceUsd) {
            // Reason: @circle-fin/x402-batching/server types use its own
            // IncomingMessage/ServerResponse subset, not Express's RequestHandler.
            // The shapes are structurally compatible; cast is safe.
            return gateway.require(priceUsd);
        },
    };
}
//# sourceMappingURL=nanopayments.js.map