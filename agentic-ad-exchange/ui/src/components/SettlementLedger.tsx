import { ARC_TESTNET_EXPLORER_BASE, type SettlementReceipt } from "@ade/shared";

export interface SettlementLedgerProps {
  receipts: SettlementReceipt[];
  sellerAddress?: string;
}

function truncateTxHash(hash: string): string {
  return `${hash.slice(0, 10)}…${hash.slice(-6)}`;
}

export function SettlementLedger({ receipts, sellerAddress }: SettlementLedgerProps): JSX.Element {
  // Reason: useAuctionStream already filters, but a missing arcTxHash on a
  // "confirmed" receipt would render a broken /tx/ link — defend in depth.
  const rows = receipts.filter(
    (r): r is SettlementReceipt & { arcTxHash: string } =>
      r.status === "confirmed" && typeof r.arcTxHash === "string" && r.arcTxHash.length > 0,
  );

  return (
    <section
      role="region"
      aria-label="Settlement ledger"
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Settlement Ledger
        </h2>
        {sellerAddress && (
          <a
            href={`${ARC_TESTNET_EXPLORER_BASE}/address/${sellerAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-exchange-accent/70 transition-colors hover:text-exchange-accent"
          >
            Arcscan ↗
          </a>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center py-6">
          <span className="text-2xl">🧾</span>
          <p className="mt-2 text-center text-xs text-slate-600">
            No settlements yet — run the demo to see explorer-verified tx.
          </p>
        </div>
      ) : (
        <ul className="exchange-scroll mt-3 max-h-96 space-y-2 overflow-y-auto pr-1">
          {rows.map((r) => (
            <li
              key={r.receiptId}
              className="group rounded-xl border border-white/5 bg-white/3 p-3 transition-all duration-200 hover:border-exchange-success/25 hover:bg-exchange-success/5"
            >
              <div className="flex items-center justify-between">
                <a
                  href={`${ARC_TESTNET_EXPLORER_BASE}/tx/${r.arcTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[11px] text-slate-400 transition-colors hover:text-exchange-accent"
                >
                  {truncateTxHash(r.arcTxHash)}
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                </a>
                <span className="font-mono text-xs font-bold text-exchange-success">
                  ${Number(r.amountUsdc).toFixed(6)}
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-700">
                  {new Date(r.confirmedAt ?? r.createdAt).toLocaleTimeString()}
                </span>
                <span className="rounded-full border border-exchange-success/25 bg-exchange-success/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-exchange-success">
                  confirmed
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
