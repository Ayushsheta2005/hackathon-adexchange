import type { AdInventoryListing, AuctionResult, BidRequest, SettlementReceipt } from "@ade/shared";

import { AdSlotPreview } from "./AdSlotPreview.js";

interface PersonaCard {
  agentId: string;
  brand: string;
  vertical: string;
  bidRange: string;
  preferredTags: string[];
  icon: string;
  borderClass: string;
  bgClass: string;
  tagClass: string;
  labelClass: string;
}

const PERSONA_CARDS: ReadonlyArray<PersonaCard> = [
  {
    agentId: "buyer-luxuryco",
    brand: "LuxuryCo",
    vertical: "Premium fashion · brand awareness",
    bidRange: "$0.003 – $0.009",
    preferredTags: ["luxury", "fashion", "premium"],
    icon: "💎",
    borderClass: "border-rose-500/30",
    bgClass: "bg-rose-500/8 hover:bg-rose-500/14",
    tagClass: "bg-rose-500/15 text-rose-300",
    labelClass: "text-rose-300",
  },
  {
    agentId: "buyer-growthco",
    brand: "GrowthCo",
    vertical: "B2B SaaS · performance marketing",
    bidRange: "$0.002 – $0.005",
    preferredTags: ["tech", "saas", "developer"],
    icon: "🚀",
    borderClass: "border-emerald-500/30",
    bgClass: "bg-emerald-500/8 hover:bg-emerald-500/14",
    tagClass: "bg-emerald-500/15 text-emerald-300",
    labelClass: "text-emerald-300",
  },
  {
    agentId: "buyer-retailco",
    brand: "RetailCo",
    vertical: "E-commerce · retargeting",
    bidRange: "$0.002 – $0.008",
    preferredTags: ["retail", "ecommerce", "checkout-intent"],
    icon: "🛍️",
    borderClass: "border-amber-500/30",
    bgClass: "bg-amber-500/8 hover:bg-amber-500/14",
    tagClass: "bg-amber-500/15 text-amber-300",
    labelClass: "text-amber-300",
  },
];

function bidAccent(buyerAgentId: string): string {
  if (buyerAgentId === "buyer-luxuryco") return "text-rose-300";
  if (buyerAgentId === "buyer-growthco") return "text-emerald-300";
  if (buyerAgentId === "buyer-retailco") return "text-amber-300";
  return "text-slate-300";
}

export interface BuyerPanelProps {
  bids: BidRequest[];
  lastAuction: AuctionResult | null;
  lastReceipt: SettlementReceipt | null;
  activeListing: AdInventoryListing | null;
  onRunAgentAuction: () => Promise<void>;
  agentRunning: boolean;
  agentError: string | null;
}

export function BuyerPanel({
  bids,
  lastAuction,
  lastReceipt,
  activeListing,
  onRunAgentAuction,
  agentRunning,
  agentError,
}: BuyerPanelProps): JSX.Element {
  return (
    <section
      role="region"
      aria-label="Buyer agents panel"
      className="glass-card flex flex-col rounded-2xl p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/15 text-sm">
              🤖
            </span>
            <h2 className="text-sm font-semibold text-slate-100">Buyer Agents</h2>
          </div>
      <p className="mt-1 text-xs text-slate-500">3 AI personas · Circle DCW wallets</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          Step 2
        </span>
      </div>

      {/* Run Multi-Agent Auction button */}
      <button
        id="run-agent-auction-btn"
        onClick={() => void onRunAgentAuction()}
        disabled={agentRunning}
        className="group relative mt-4 w-full overflow-hidden rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-300 transition-all duration-200 hover:border-blue-400/70 hover:bg-blue-500/20 hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {agentRunning ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-400/30 border-t-blue-400" />
            AI agents bidding…
          </span>
        ) : (
          "🤖  Run Multi-Agent Auction"
        )}
      </button>
      {agentError && (
        <p className="mt-1.5 text-center text-[11px] text-red-400">{agentError}</p>
      )}

      {/* Persona roster */}
      <div className="mt-4 space-y-2">
        {PERSONA_CARDS.map((p) => (
          <div
            key={p.agentId}
            className={`rounded-xl border ${p.borderClass} ${p.bgClass} p-3 transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{p.icon}</span>
                <span className={`text-xs font-semibold ${p.labelClass}`}>{p.brand}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">{p.bidRange}</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{p.vertical}</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {p.preferredTags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] ${p.tagClass}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Live bid queue */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
            Live Bid Queue
          </p>
          {bids.length > 0 && (
            <span className="rounded-full bg-exchange-accent/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-exchange-accent">
              {bids.length}
            </span>
          )}
        </div>

        {bids.length === 0 ? (
          <p className="mt-2 text-xs text-slate-600">
            No active bids — trigger Multi-Agent Auction.
          </p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {bids.map((b, i) => (
              <li
                key={b.bidId}
                className="animate-bid-slide-in rounded-xl border border-white/5 bg-white/3 p-2.5 text-xs"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${bidAccent(b.buyerAgentId)}`}>
                    {b.buyerAgentId}
                  </span>
                  <span className="font-mono font-bold text-exchange-accent">
                    ${b.bidAmountUsdc}
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-slate-600">
                  tags: {b.targeting.contextTags.join(", ") || "none"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ad slot preview — appears after auction */}
      {lastAuction != null && (
        <AdSlotPreview auction={lastAuction} receipt={lastReceipt} listing={activeListing} />
      )}
    </section>
  );
}
