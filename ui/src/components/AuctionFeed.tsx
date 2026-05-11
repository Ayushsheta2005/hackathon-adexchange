import type { AuctionResult } from "@ade/shared";

export interface AuctionFeedProps {
  auctions: AuctionResult[];
}

function truncateId(id: string): string {
  return id.slice(0, 8) + "…";
}

function agentColor(agentId: string): string {
  if (agentId === "buyer-luxuryco") return "text-rose-300";
  if (agentId === "buyer-growthco") return "text-emerald-300";
  if (agentId === "buyer-retailco") return "text-amber-300";
  return "text-slate-300";
}

export function AuctionFeed({ auctions }: AuctionFeedProps): JSX.Element {
  return (
    <section
      role="region"
      aria-label="Auction feed"
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Auction History
        </h2>
        {auctions.length > 0 && (
          <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-500">
            {auctions.length}
          </span>
        )}
      </div>

      {auctions.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center py-6">
          <span className="text-2xl">📈</span>
          <p className="mt-2 text-xs text-slate-600">No auctions yet — run one to see results.</p>
        </div>
      ) : (
        <ul className="exchange-scroll mt-3 max-h-96 space-y-2 overflow-y-auto pr-1">
          {auctions.map((a, i) => (
            <li
              key={a.auctionId}
              className="animate-fade-in group rounded-xl border border-white/5 bg-white/3 p-3 transition-all duration-200 hover:border-exchange-accent/20 hover:bg-exchange-accent/5"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-600">{truncateId(a.auctionId)}</span>
                <span className="font-mono text-xs font-bold text-exchange-accent">
                  ${a.clearingPriceUsdc}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-500">Winner:</span>
                <span className={`font-semibold ${agentColor(a.winnerBuyerAgentId)}`}>
                  {a.winnerBuyerAgentId}
                </span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-slate-700">
                {new Date(a.createdAt).toLocaleTimeString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
