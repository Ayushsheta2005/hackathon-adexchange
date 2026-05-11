import type { AdInventoryListing, AuctionResult, SettlementReceipt } from "@ade/shared";

interface Creative {
  headline: string;
  body: string;
  cta: string;
  bgFrom: string;
  bgTo: string;
}

const CREATIVES: Record<string, Creative> = {
  "buyer-luxuryco": {
    headline: "LuxuryCo · AW26 Collection",
    body: "Italian craftsmanship, redefined",
    cta: "Shop the Edit →",
    bgFrom: "#831843",
    bgTo: "#0c0a09",
  },
  "buyer-growthco": {
    headline: "GrowthCo · DevOps Platform",
    body: "Ship 10× faster with smart pipelines",
    cta: "Start Free Trial →",
    bgFrom: "#065f46",
    bgTo: "#1d4ed8",
  },
  "buyer-retailco": {
    headline: "RetailCo · Cart Recovery",
    body: "Your saved items — 20% off today",
    cta: "Complete Order →",
    bgFrom: "#b45309",
    bgTo: "#7c2d12",
  },
};

const DEFAULT_CREATIVE: Creative = {
  headline: "Premium Ad Placement",
  body: "Delivered via Arc nanopayments",
  cta: "Learn More →",
  bgFrom: "#0e7490",
  bgTo: "#1e3a5f",
};

export interface AdSlotPreviewProps {
  auction: AuctionResult;
  receipt: SettlementReceipt | null;
  listing: AdInventoryListing | null;
}

export function AdSlotPreview({ auction, receipt, listing }: AdSlotPreviewProps): JSX.Element {
  const creative = CREATIVES[auction.winnerBuyerAgentId] ?? DEFAULT_CREATIVE;
  const size = listing?.size ?? "300x250";
  const [wStr, hStr] = size.split("x");
  const aspectPct = ((Number(hStr) / Number(wStr)) * 100).toFixed(1);

  const isConfirmed = receipt?.status === "confirmed";
  const isFailed = receipt?.status === "failed";

  const statusColor = receipt == null
    ? "text-amber-400"
    : isConfirmed
      ? "text-exchange-success"
      : isFailed
        ? "text-exchange-warn"
        : "text-amber-400";

  const statusLabel =
    receipt == null
      ? "pending…"
      : isConfirmed
        ? "confirmed ✓"
        : isFailed
          ? "failed ✗"
          : receipt.status;

  return (
    <div className="mt-4 animate-fade-in rounded-2xl border border-exchange-accent/25 bg-exchange-accent/5 p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-exchange-accent">
          <span className="inline-block h-2 w-2 animate-status-dot rounded-full bg-exchange-accent" />
          Ad Live
        </span>
        <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-500">
          {size}
        </span>
      </div>

      {/* Creative canvas */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-white/10"
        style={{ paddingBottom: `${aspectPct}%` }}
      >
        <div
          className="absolute inset-0 flex flex-col items-start justify-center p-4"
          style={{ background: `linear-gradient(135deg, ${creative.bgFrom}, ${creative.bgTo})` }}
        >
          <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-white/50">
            Sponsored
          </p>
          <p className="mt-1 text-sm font-bold leading-tight text-white">{creative.headline}</p>
          <p className="mt-1 text-xs text-white/75">{creative.body}</p>
          <span className="mt-3 rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            {creative.cta}
          </span>
        </div>
      </div>

      {/* Meta grid */}
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
        <div>
          <p className="font-mono text-[10px] text-slate-600">Clearing price</p>
          <p className="font-mono text-xs font-bold text-exchange-accent">
            ${auction.clearingPriceUsdc} USDC
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-slate-600">Settlement</p>
          <p className={`font-mono text-xs font-bold ${statusColor}`}>{statusLabel}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-slate-600">Winner</p>
          <p className="truncate font-mono text-xs text-slate-300">{auction.winnerBuyerAgentId}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] text-slate-600">Format</p>
          <p className="font-mono text-xs text-slate-400">
            {listing?.format ?? "banner"} · {listing?.adType ?? "display"}
          </p>
        </div>
      </div>
    </div>
  );
}
