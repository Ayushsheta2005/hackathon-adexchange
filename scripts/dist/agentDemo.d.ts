/**
 * CLI wrapper around the multi-agent auction. The orchestrator reads existing
 * inventory from the Exchange's in-memory listingStore, so the script cannot
 * call `runAgentAuction` directly — instead it POSTs to /demo/agent-run, the
 * same route the UI's "Run Multi-Agent Auction" button uses. Keeps the two
 * trigger paths behaviorally identical.
 */
declare function runOnce(): Promise<void>;
export { runOnce };
//# sourceMappingURL=agentDemo.d.ts.map