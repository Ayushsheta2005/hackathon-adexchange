import type { AdInventoryListing } from "@ade/shared";

export interface SellerPanelProps {
  listings: AdInventoryListing[];
  onRegister: () => Promise<void>;
  registering: boolean;
  disabledReason: string | null;
}

export function SellerPanel({
  listings,
  onRegister,
  registering,
  disabledReason,
}: SellerPanelProps): JSX.Element {
  return (
    <section
      role="region"
      aria-label="Seller agent panel"
      className="glass-card flex flex-col rounded-2xl p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 text-sm">
              🏪
            </span>
            <h2 className="text-sm font-semibold text-slate-100">Seller Agent</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">sigma · ad inventory manager</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-purple-400">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          Step 1
        </span>
      </div>

      {/* Listings */}
      <div className="mt-4 flex-1 space-y-2">
        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/8 py-6">
            <span className="text-2xl">📭</span>
            <p className="mt-2 text-xs text-slate-500">No ad slots registered yet.</p>
          </div>
        ) : (
          listings.map((l) => (
            <div
              key={l.listingId}
              className="group rounded-xl border border-white/6 bg-white/3 p-3 transition-all duration-200 hover:border-purple-500/30 hover:bg-purple-500/5"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 text-xs">
                  {l.format} · {l.size}
                </span>
                <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
                  {l.adType}
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Floor price</span>
                <span className="font-mono text-xs font-semibold text-exchange-accent">
                  ${l.floorPriceUsdc} USDC
                </span>
              </div>
              <div className="mt-1 font-mono text-[10px] text-slate-600">
                #{l.listingId.slice(0, 8)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Register button */}
      <button
        onClick={() => void onRegister()}
        disabled={registering || disabledReason !== null}
        title={disabledReason ?? undefined}
        className="group relative mt-4 w-full overflow-hidden rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-2.5 text-sm font-semibold text-purple-300 transition-all duration-200 hover:border-purple-400/60 hover:bg-purple-500/20 hover:text-purple-200 hover:shadow-glow-purple disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="relative z-10">
          {registering ? "Registering…" : "+ Register Demo Ad Slot"}
        </span>
      </button>

      {disabledReason ? (
        <p className="mt-2 text-center text-[11px] text-exchange-warn">{disabledReason}</p>
      ) : (
        <p className="mt-2 text-center text-[11px] text-slate-600">
          300×250 banner · floor $0.002 USDC
        </p>
      )}
    </section>
  );
}
