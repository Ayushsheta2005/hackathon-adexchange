import type { JSX } from "react";

import type { YieldBuyerRow } from "./yieldPanelTypes.js";

function statusStyle(s: YieldBuyerRow["status"]): string {
  if (s === "blocked") return "border-red-500/40 bg-red-500/10 text-red-400";
  if (s === "preferred") return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
  return "border-white/10 bg-white/5 text-slate-400";
}

export interface SellerYieldBuyersTabProps {
  buyers: YieldBuyerRow[];
  onCycleStatus: (id: string) => void;
}

export function SellerYieldBuyersTab({
  buyers,
  onCycleStatus,
}: SellerYieldBuyersTabProps): JSX.Element {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-sm">
      <div className="border-b border-white/10 px-3 py-2 font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
        DSPs winning inventory
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-white/10 font-nexus-mono text-[9.5px] uppercase tracking-wider text-slate-500">
              <th className="px-3 py-2 font-semibold">Buyer</th>
              <th className="px-2 py-2 font-semibold">Wins today</th>
              <th className="px-2 py-2 font-semibold">Avg CPM</th>
              <th className="px-2 py-2 font-semibold">% revenue</th>
              <th className="px-3 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((b) => (
              <tr key={b.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <td className="px-3 py-2.5 font-medium text-slate-200">{b.name}</td>
                <td className="px-2 py-2.5 font-nexus-mono text-slate-300">{b.winsToday}</td>
                <td className="px-2 py-2.5 font-nexus-mono text-cyan-400">{b.avgCpm}</td>
                <td className="px-2 py-2.5 font-nexus-mono text-slate-300">{b.pctRevenue}</td>
                <td className="px-3 py-2.5">
                  <button
                    type="button"
                    className={`rounded-full border px-2.5 py-1 font-nexus-mono text-[10px] font-semibold uppercase transition-all hover:scale-105 ${statusStyle(b.status)}`}
                    onClick={() => onCycleStatus(b.id)}
                  >
                    {b.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
