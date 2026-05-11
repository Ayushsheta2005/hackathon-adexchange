import type { JSX } from "react";

import type { YieldDealRow } from "./yieldPanelTypes.js";

function badgeClass(status: YieldDealRow["status"]): string {
  if (status === "active") return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
  if (status === "draft") return "border-white/10 bg-white/5 text-slate-400";
  return "border-amber-500/40 bg-amber-500/10 text-amber-400";
}

export interface SellerYieldDealsTabProps {
  deals: YieldDealRow[];
  expandedDealIds: Set<string>;
  onToggleDeal: (id: string) => void;
  onNewDeal: () => void;
}

export function SellerYieldDealsTab({
  deals,
  expandedDealIds,
  onToggleDeal,
  onNewDeal,
}: SellerYieldDealsTabProps): JSX.Element {
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onNewDeal}
        className="w-full rounded-xl border border-dashed border-cyan-500/30 bg-cyan-500/5 py-2.5 text-[12.5px] font-semibold text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors"
      >
        + New deal
      </button>
      <ul className="list-none space-y-2 p-0">
        {deals.map((d) => {
          const open = expandedDealIds.has(d.id);
          return (
            <li
              key={d.id}
              className="rounded-xl border border-white/10 bg-white/5 shadow-sm backdrop-blur-sm overflow-hidden transition-all"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
                onClick={() => onToggleDeal(d.id)}
                aria-expanded={open}
              >
                <span className="text-[13px] font-semibold text-slate-200">{d.name}</span>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 font-nexus-mono text-[9px] font-semibold uppercase ${badgeClass(d.status)}`}>
                  {d.status}
                </span>
              </button>
              {open ? (
                <div className="border-t border-white/10 px-3 py-2.5 font-nexus-mono text-[11.5px] text-slate-400 space-y-1">
                  <div className="flex justify-between"><span className="text-slate-500">CPM</span><span className="text-cyan-400">{d.cpm}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Duration</span><span className="text-slate-300">{d.duration}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Imps/mo</span><span className="text-slate-300">{d.impsPerMo}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Buyer</span><span className="text-slate-300">{d.buyer}</span></div>
                  <div className="mt-1 text-[10.5px] text-slate-600">Deal ID {d.id}</div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
