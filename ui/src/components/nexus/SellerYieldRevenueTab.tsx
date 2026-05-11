import type { JSX } from "react";

import { YIELD_PLACEMENT_ROWS } from "./sellerYieldConstants.js";
import type { YieldRevenuePeriod } from "./yieldPanelTypes.js";

const PERIODS: { id: YieldRevenuePeriod; label: string }[] = [
  { id: "today", label: "TODAY" },
  { id: "7d", label: "LAST 7D" },
  { id: "total", label: "TOTAL" },
  { id: "custom", label: "CUSTOM" },
];

export interface SellerYieldRevenueTabProps {
  period: YieldRevenuePeriod;
  onPeriod: (p: YieldRevenuePeriod) => void;
  applyFlight: Record<string, boolean>;
  onApplyFlight: (key: string, v: boolean) => void;
}

export function SellerYieldRevenueTab({
  period,
  onPeriod,
  applyFlight,
  onApplyFlight,
}: SellerYieldRevenueTabProps): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1">
        {PERIODS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPeriod(p.id)}
            className={`rounded-full border px-3 py-1.5 font-nexus-mono text-[10.5px] font-semibold uppercase tracking-wide transition-all ${
              period === p.id
                ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-500/10"
                : "border-white/10 bg-white/5 text-slate-500 hover:text-slate-300"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-cyan-500/5 p-4 shadow-lg shadow-black/20 backdrop-blur-sm">
        <div className="font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
          Executive summary
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-200">
          Yield agent active · <span className="text-cyan-400 font-semibold">$4,210</span> revenue today · <span className="text-emerald-400">67%</span> fill rate · <span className="text-emerald-400">+$840</span> vs floor benchmark
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-sm">
        <div className="border-b border-white/10 px-3 py-2 font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
          By placement
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[360px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-white/10 font-nexus-mono text-[9.5px] uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2 font-semibold">Placement</th>
                <th className="px-2 py-2 font-semibold">Imps</th>
                <th className="px-2 py-2 font-semibold">Fill%</th>
                <th className="px-2 py-2 font-semibold">eCPM</th>
                <th className="px-2 py-2 font-semibold">Revenue</th>
                <th className="px-3 py-2 font-semibold">vs floor</th>
              </tr>
            </thead>
            <tbody>
              {YIELD_PLACEMENT_ROWS.map((row) => (
                <tr
                  key={row.placement}
                  className={`border-b border-white/5 last:border-0 transition-colors hover:bg-white/5 ${
                    row.tone === "bad"
                      ? "bg-red-500/5"
                      : row.tone === "warn"
                        ? "bg-amber-500/5"
                        : "bg-transparent"
                  }`}
                >
                  <td className="px-3 py-2.5 font-medium text-slate-200">{row.placement}</td>
                  <td className="px-2 py-2.5 font-nexus-mono text-slate-400">{row.imps}</td>
                  <td className="px-2 py-2.5 font-nexus-mono text-slate-300">{row.fill}</td>
                  <td className="px-2 py-2.5 font-nexus-mono text-cyan-400">{row.ecpm}</td>
                  <td className="px-2 py-2.5 font-nexus-mono text-emerald-400 font-semibold">{row.revenue}</td>
                  <td className={`px-3 py-2.5 font-nexus-mono font-medium ${row.tone === "bad" ? "text-red-400" : row.tone === "warn" ? "text-amber-400" : "text-emerald-400"}`}>{row.vsFloor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="mb-2 font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
          Top yield decisions
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-emerald-500/20 border-l-[3px] border-l-emerald-500 bg-emerald-500/5 p-3 shadow-sm">
            <div className="font-nexus-mono text-[9px] font-semibold uppercase text-emerald-400">Best call</div>
            <p className="mt-2 text-[11.5px] leading-snug text-slate-300">
              Held homepage floor — demand stayed above $2.14 all day
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/20 border-l-[3px] border-l-amber-500 bg-amber-500/5 p-3 shadow-sm">
            <div className="font-nexus-mono text-[9px] font-semibold uppercase text-amber-400">Floor alert</div>
            <p className="mt-2 text-[11.5px] leading-snug text-slate-300">
              CTV pre-roll at $4.20 cutting demand — 34% fill vs 71% benchmark
            </p>
          </div>
          <div className="rounded-xl border border-blue-500/20 border-l-[3px] border-l-blue-500 bg-blue-500/5 p-3 shadow-sm">
            <div className="font-nexus-mono text-[9px] font-semibold uppercase text-blue-400">Learned</div>
            <p className="mt-2 text-[11.5px] leading-snug text-slate-300">
              Mobile banner floor $0.80 leaving ~$0.40/imp on table
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
          Apply to next flight
        </div>
        <ul className="space-y-2 text-[12.5px] text-slate-300">
          <li className="flex items-start gap-2">
            <input
              id="flt-ctv"
              type="checkbox"
              className="mt-1 accent-cyan-500"
              checked={applyFlight.ctv ?? false}
              onChange={(e) => onApplyFlight("ctv", e.target.checked)}
            />
            <label htmlFor="flt-ctv" className="cursor-pointer hover:text-slate-100 transition-colors">Drop CTV pre-roll floor to $3.20</label>
          </li>
          <li className="flex items-start gap-2">
            <input
              id="flt-mob"
              type="checkbox"
              className="mt-1 accent-cyan-500"
              checked={applyFlight.mobile ?? false}
              onChange={(e) => onApplyFlight("mobile", e.target.checked)}
            />
            <label htmlFor="flt-mob" className="cursor-pointer hover:text-slate-100 transition-colors">Raise mobile banner floor to $1.20</label>
          </li>
          <li className="flex items-start gap-2">
            <input
              id="flt-home"
              type="checkbox"
              className="mt-1 accent-cyan-500"
              checked={applyFlight.homepage ?? false}
              onChange={(e) => onApplyFlight("homepage", e.target.checked)}
            />
            <label htmlFor="flt-home" className="cursor-pointer hover:text-slate-100 transition-colors">Keep homepage floor at $1.85 — well calibrated</label>
          </li>
        </ul>
      </div>
    </div>
  );
}
