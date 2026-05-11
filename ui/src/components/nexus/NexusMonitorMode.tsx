import type { JSX } from "react";
import type { ControlStateHandle } from "../../hooks/useControlState.js";
import { NexusExchangePulseCard } from "./NexusExchangePulseCard.js";
import type { NexusExchangePulseCardProps } from "./NexusExchangePulseCard.js";
import { MOCK_PACING } from "./nexusMockCampaign.js";
import type { NexusException } from "./nexusRightPanelTypes.js";

export interface NexusMonitorModeProps {
  exceptions: NexusException[];
  showAllExceptions: boolean;
  onShowAllExceptions: (v: boolean) => void;
  exchangeOpen: boolean;
  onExchangeOpen: (v: boolean) => void;
  exchange: NexusExchangePulseCardProps;
  control: ControlStateHandle;
  settledDisplay: string;
  winRateDisplay: string;
  burnDisplay: string;
  savedDisplay: string;
  autoExecutedToday: number;
  totalDecisionsToday: number;
}

function pacingNowPct(): number {
  const d = new Date();
  return Math.min(100, Math.round(((d.getHours() * 60 + d.getMinutes()) / (24 * 60)) * 100));
}

export function NexusMonitorMode({
  exceptions, showAllExceptions, onShowAllExceptions,
  exchangeOpen, onExchangeOpen, exchange, control,
  settledDisplay, winRateDisplay, burnDisplay, savedDisplay,
  autoExecutedToday, totalDecisionsToday,
}: NexusMonitorModeProps): JSX.Element {
  const nowPct = pacingNowPct();
  const visible = exceptions.length <= 3 ? exceptions : showAllExceptions ? exceptions : exceptions.slice(0, 2);
  const overflow = exceptions.length > 3;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-violet-500/5 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <h3 className="text-[13px] font-semibold text-slate-200">Nexus</h3>
            <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.2)] animate-pulse" aria-hidden />
            <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-nexus-mono text-[10px] font-medium uppercase tracking-wide text-slate-400">autonomous</span>
          </div>
          <button type="button" disabled={control.pending}
            onClick={() => void (control.paused ? control.resume() : control.pause())}
            className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11.5px] font-medium text-slate-300 hover:bg-white/10 hover:text-white disabled:opacity-50 transition-colors">
            {control.paused ? "Resume" : "Pause"}
          </button>
        </div>
        <p className="mt-2 font-nexus-mono text-[11px] text-slate-500">14h 22m uptime · {totalDecisionsToday} decisions</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
          <MetricChip label="Settled" value={settledDisplay} tone="neutral" />
          <MetricChip label="Win rate" value={winRateDisplay} tone="good" />
          <MetricChip label="Burn/h" value={burnDisplay} tone="warn" />
          <MetricChip label="Saved" value={savedDisplay} tone="good" />
        </div>
      </div>

      {exceptions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-emerald-400 text-lg">✓</span>
          </div>
          <p className="text-sm font-medium text-slate-300">Nexus is operating within policy</p>
          <p className="mt-2 max-w-xs text-[12.5px] leading-relaxed text-slate-500">{autoExecutedToday} of {totalDecisionsToday} decisions auto-executed today</p>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map((ex) => (
            <article key={ex.id}
              className={`rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm ${ex.severity === "critical" ? "border-l-2 border-l-red-500" : ex.severity === "success" ? "border-l-2 border-l-emerald-500" : "border-l-2 border-l-amber-500"}`}>
              <div className="flex items-start gap-2">
                {ex.pulse ? <span className="mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" aria-hidden /> : null}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-slate-200">{ex.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-slate-400">{ex.context}</p>
                  <button type="button" className="mt-2 text-left font-nexus-mono text-[11px] font-medium text-cyan-400 underline decoration-cyan-500/30 underline-offset-2 hover:text-cyan-300 transition-colors">{ex.actionLabel}</button>
                </div>
              </div>
            </article>
          ))}
          {overflow && !showAllExceptions ? (
            <button type="button" onClick={() => onShowAllExceptions(true)}
              className="w-full rounded-lg py-2 text-center font-nexus-mono text-[11.5px] font-medium text-slate-400 hover:bg-white/5 hover:text-slate-300 transition-colors">
              See all {exceptions.length} →
            </button>
          ) : null}
        </div>
      )}

      <details className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <summary className="cursor-pointer list-none px-4 py-3 font-nexus-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 marker:hidden [&::-webkit-details-marker]:hidden hover:text-slate-300 transition-colors">
          <span className="select-none">Pacing</span>
        </summary>
        <div className="space-y-3 border-t border-white/10 px-4 py-3">
          {MOCK_PACING.map((row) => (
            <div key={row.name}>
              <div className="flex justify-between font-nexus-mono text-[10.5px]">
                <span className="text-slate-300">{row.name}</span>
                <span className={row.pct >= 80 ? "text-emerald-400" : row.pct <= 20 ? "text-red-400" : "text-slate-400"}>{row.pct}% · {row.label}</span>
              </div>
              <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                <div className={`absolute left-0 top-0 h-full rounded-full ${row.pct >= 80 ? "bg-emerald-500" : row.pct <= 20 ? "bg-red-500" : "bg-cyan-500"}`} style={{ width: `${row.pct}%` }} />
                <div className="absolute top-0 h-full w-px bg-white/30" style={{ left: `${nowPct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </details>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <button type="button" aria-expanded={exchangeOpen}
          onClick={() => onExchangeOpen(!exchangeOpen)}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-nexus-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors rounded-xl">
          Live exchange
          <span className="text-cyan-400">{exchangeOpen ? "−" : "+"}</span>
        </button>
        {exchangeOpen ? (
          <div className="border-t border-white/10 p-4"><NexusExchangePulseCard {...exchange} /></div>
        ) : null}
      </div>
    </div>
  );
}

function MetricChip({ label, value, tone }: { label: string; value: string; tone: "neutral" | "good" | "warn" }): JSX.Element {
  const valCls = tone === "good" ? "text-emerald-400" : tone === "warn" ? "text-amber-400" : "text-cyan-400";
  return (
    <div className="px-3 py-3">
      <div className="font-nexus-mono text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`mt-1 font-nexus-mono text-sm font-semibold ${valCls}`}>{value}</div>
    </div>
  );
}
