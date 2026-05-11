import type { JSX } from "react";
import { MOCK_ANALYZE_ROWS } from "./nexusMockCampaign.js";
import type { AnalyzePeriod } from "./nexusRightPanelTypes.js";

export interface NexusAnalyzeModeProps {
  period: AnalyzePeriod;
  onPeriod: (p: AnalyzePeriod) => void;
  applyNext: Record<string, boolean>;
  onApplyNext: (key: string, v: boolean) => void;
}

const PERIODS: { id: AnalyzePeriod; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7d" },
  { id: "campaign", label: "Campaign total" },
  { id: "custom", label: "Custom" },
];

export function NexusAnalyzeMode({ period, onPeriod, applyNext, onApplyNext }: NexusAnalyzeModeProps): JSX.Element {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1">
        {PERIODS.map((p) => (
          <button key={p.id} type="button" onClick={() => onPeriod(p.id)}
            className={`rounded-full border px-3 py-1.5 font-nexus-mono text-[10.5px] font-semibold uppercase tracking-wide transition-all ${
              period === p.id
                ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-500/10"
                : "border-white/10 bg-white/5 text-slate-500 hover:text-slate-300"
            }`}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-violet-500/5 p-4 shadow-lg backdrop-blur-sm">
        <div className="font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">Executive summary</div>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-200">
          Nexus ran 14h 22m · <span className="text-emerald-400">63.1%</span> win rate · <span className="text-cyan-400 font-semibold">$184k</span> settled · <span className="text-emerald-400">+$1,284</span> vs benchmark
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="border-b border-white/10 px-3 py-2 font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">By channel</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-white/10 font-nexus-mono text-[9.5px] uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2 font-semibold">Channel</th>
                <th className="px-2 py-2 font-semibold">Imps</th>
                <th className="px-2 py-2 font-semibold">Win%</th>
                <th className="px-2 py-2 font-semibold">VCR</th>
                <th className="px-2 py-2 font-semibold">eCPM</th>
                <th className="px-3 py-2 font-semibold">vs Goal</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ANALYZE_ROWS.map((row) => (
                <tr key={row.channel}
                  className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${row.tone === "beat" ? "bg-emerald-500/5" : row.tone === "miss" ? "bg-red-500/5" : "bg-transparent"}`}>
                  <td className="px-3 py-2.5 font-medium text-slate-200">{row.channel}</td>
                  <td className="px-2 py-2.5 font-nexus-mono text-slate-400">{row.imps}</td>
                  <td className="px-2 py-2.5 font-nexus-mono text-slate-300">{row.winPct}</td>
                  <td className="px-2 py-2.5 font-nexus-mono text-slate-300">{row.vcr}</td>
                  <td className="px-2 py-2.5 font-nexus-mono text-cyan-400">{row.ecpm}</td>
                  <td className={`px-3 py-2.5 font-nexus-mono font-medium ${row.tone === "beat" ? "text-emerald-400" : row.tone === "miss" ? "text-red-400" : "text-slate-300"}`}>{row.vsGoal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="mb-2 font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">Top Nexus decisions</div>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-emerald-500/20 border-l-[3px] border-l-emerald-500 bg-emerald-500/5 p-3">
            <div className="font-nexus-mono text-[9px] font-semibold uppercase text-emerald-400">Best call</div>
            <p className="mt-2 text-[11.5px] leading-snug text-slate-300">Held bid floor on Prime Video when VCR was already above goal.</p>
          </div>
          <div className="rounded-xl border border-amber-500/20 border-l-[3px] border-l-amber-500 bg-amber-500/5 p-3">
            <div className="font-nexus-mono text-[9px] font-semibold uppercase text-amber-400">Close call</div>
            <p className="mt-2 text-[11.5px] leading-snug text-slate-300">Almost shifted budget to Disney+; paused when win-rate dipped.</p>
          </div>
          <div className="rounded-xl border border-sky-500/20 border-l-[3px] border-l-sky-500 bg-sky-500/5 p-3">
            <div className="font-nexus-mono text-[9px] font-semibold uppercase text-sky-400">Learned</div>
            <p className="mt-2 text-[11.5px] leading-snug text-slate-300">YouTube dayparts after 9pm outperform for Nike 1P.</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">Apply to next campaign</div>
        <ul className="mt-3 list-none space-y-2 p-0">
          <li>
            <label className="flex cursor-pointer items-start gap-2 text-[12.5px] text-slate-300 hover:text-slate-100 transition-colors">
              <input type="checkbox" checked={Boolean(applyNext.pacing)} onChange={(e) => onApplyNext("pacing", e.target.checked)} className="mt-0.5 accent-cyan-500" />
              Carry pacing guardrails (Netflix / Prime Video on-track targets)
            </label>
          </li>
          <li>
            <label className="flex cursor-pointer items-start gap-2 text-[12.5px] text-slate-300 hover:text-slate-100 transition-colors">
              <input type="checkbox" checked={Boolean(applyNext.policy)} onChange={(e) => onApplyNext("policy", e.target.checked)} className="mt-0.5 accent-cyan-500" />
              Reuse approval gates and delta caps from this flight
            </label>
          </li>
          <li>
            <label className="flex cursor-pointer items-start gap-2 text-[12.5px] text-slate-300 hover:text-slate-100 transition-colors">
              <input type="checkbox" checked={Boolean(applyNext.creative)} onChange={(e) => onApplyNext("creative", e.target.checked)} className="mt-0.5 accent-cyan-500" />
              Prefer auto VCR rotation for CTV line items
            </label>
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[12.5px] font-medium text-slate-300 hover:bg-white/10 transition-colors">Download PDF</button>
        <button type="button" className="rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-[12.5px] font-semibold text-white hover:opacity-90 transition-opacity">Share with client →</button>
      </div>
    </div>
  );
}
