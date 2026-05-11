import type { AdInventoryListing, AuctionResult, SettlementReceipt } from "@ade/shared";

export interface AuctionPanelProps {
  listings: AdInventoryListing[];
  activeListingId: string | null;
  onSelectListing: (id: string) => void;
  onRunAuction: () => Promise<void>;
  running: boolean;
  lastAuction: AuctionResult | null;
  lastReceipt: SettlementReceipt | null;
}

export function AuctionPanel({
  listings,
  activeListingId,
  onSelectListing,
  onRunAuction,
  running,
  lastAuction,
  lastReceipt,
}: AuctionPanelProps): JSX.Element {
  const noListings = listings.length === 0;

  const receiptForCurrentAuction =
    lastReceipt && lastAuction && lastReceipt.auctionId === lastAuction.auctionId
      ? lastReceipt
      : null;
  const settlementLabel = receiptForCurrentAuction?.status ?? "pending…";
  const receiptColor =
    receiptForCurrentAuction == null
      ? "text-amber-400"
      : receiptForCurrentAuction.status === "confirmed"
        ? "text-exchange-success"
        : receiptForCurrentAuction.status === "failed"
          ? "text-exchange-warn"
          : "text-amber-400";

  return (
    <section
      role="region"
      aria-label="Auction engine panel"
      className="glass-card flex flex-col rounded-2xl p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-exchange-accent/10 text-sm">
              ⚡
            </span>
            <h2 className="text-sm font-semibold text-slate-100">Exchange Engine</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">second-price sealed-bid · auto-clear</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-exchange-accent/30 bg-exchange-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-exchange-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-exchange-accent" />
          Step 3
        </span>
      </div>

      {/* Listing selector */}
      <div className="mt-4">
        <label className="text-[11px] font-medium uppercase tracking-widest text-slate-500" htmlFor="listing-select">
          Ad slot
        </label>
        {noListings ? (
          <p className="mt-1.5 text-xs text-slate-600">Register a slot first (Step 1).</p>
        ) : (
          <select
            id="listing-select"
            value={activeListingId ?? ""}
            onChange={(e) => onSelectListing(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/8 bg-white/4 px-3 py-2.5 text-xs text-slate-200 transition-colors focus:border-exchange-accent/50 focus:outline-none focus:ring-1 focus:ring-exchange-accent/30"
          >
            {listings.map((l) => (
              <option key={l.listingId} value={l.listingId} className="bg-exchange-card">
                {l.format} {l.size} · floor ${l.floorPriceUsdc}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Run Auction CTA */}
      <button
        onClick={() => void onRunAuction()}
        disabled={noListings || running}
        className="group relative mt-4 w-full overflow-hidden rounded-xl border border-exchange-accent/40 bg-exchange-accent/10 px-4 py-3 text-sm font-semibold text-exchange-accent transition-all duration-200 hover:border-exchange-accent/70 hover:bg-exchange-accent/20 hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-40"
      >
        {running ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-exchange-accent/30 border-t-exchange-accent" />
            Running auction…
          </span>
        ) : (
          "▶  Run Auction (manual)"
        )}
      </button>
      <p className="mt-1.5 text-center text-[11px] text-slate-600">
        Auctions auto-clear · this forces an early run
      </p>

      {/* Last auction result */}
      {lastAuction ? (
        <div className="mt-4 flex-1 rounded-xl border border-exchange-accent/20 bg-exchange-accent/5 p-4">
          <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-exchange-accent/70">
            ── Last Result ──
          </p>
          <div className="space-y-2.5">
            <ResultRow label="Winner" value={lastAuction.winnerBuyerAgentId} accent />
            <ResultRow label="Clearing price" value={`$${lastAuction.clearingPriceUsdc} USDC`} accent />
            <ResultRow label="Winning bid" value={`$${lastAuction.winningBidUsdc} USDC`} />
            <ResultRow label="Seller" value={lastAuction.sellerAgentId} />
            <div className="flex items-center justify-between border-t border-white/5 pt-2">
              <span className="text-[11px] text-slate-500">Settlement</span>
              <span className={`font-mono text-xs font-semibold ${receiptColor}`}>
                {settlementLabel}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/8 p-6">
          <span className="text-2xl">🔇</span>
          <p className="mt-2 text-center text-xs text-slate-600">
            No auction run yet.
            <br />
            Place bids, then click Run Auction.
          </p>
        </div>
      )}
    </section>
  );
}

function ResultRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span
        className={`font-mono text-xs font-semibold ${accent ? "text-exchange-accent" : "text-slate-300"}`}
      >
        {value}
      </span>
    </div>
  );
}
