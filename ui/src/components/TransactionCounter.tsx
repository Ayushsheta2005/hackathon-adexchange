import { useState } from "react";

import { runDemoLoad } from "../api/client.js";

export interface TransactionCounterProps {
  count: number;
}

/** ≥ 50 confirmed settlements is the hackathon submission gate. */
const HACKATHON_GATE = 50;

export function TransactionCounter({ count }: TransactionCounterProps): JSX.Element {
  const met = count >= HACKATHON_GATE;
  const progress = Math.min((count / HACKATHON_GATE) * 100, 100);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ completed: number; totalUsdc: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDemoLoad(): Promise<void> {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await runDemoLoad(50);
      setResult({ completed: res.completed, totalUsdc: res.totalUsdcSettled });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo load failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      role="status"
      aria-label="Transaction counter"
      className="glass-card rounded-2xl p-5"
    >
      <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
        On-chain Settlements
      </h2>

      {/* Big ticker number */}
      <div className="mt-3 flex items-end gap-2">
        <p
          className={`animate-ticker-count font-mono text-5xl font-bold tabular-nums leading-none ${
            met ? "text-exchange-success" : "text-exchange-accent"
          }`}
        >
          {count}
        </p>
        <span className="mb-1 font-mono text-sm text-slate-600">/ {HACKATHON_GATE}</span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/6">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            met ? "bg-exchange-success shadow-glow-green" : "bg-exchange-accent"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status label */}
      <p className={`mt-2 text-xs font-medium ${met ? "text-exchange-success" : "text-slate-500"}`}>
        {met
          ? `✓ Hackathon target met (≥ ${HACKATHON_GATE} confirmed)`
          : `${count}/${HACKATHON_GATE} confirmed settlements`}
      </p>

      {met && (
        <div className="mt-2 rounded-lg border border-exchange-success/30 bg-exchange-success/10 px-3 py-1.5 text-center">
          <span className="text-[11px] font-semibold text-exchange-success">🎯 Gate reached</span>
        </div>
      )}

      {/* Run 50-Cycle Demo button */}
      <button
        id="run-demo-load-btn"
        onClick={() => void handleDemoLoad()}
        disabled={loading}
        className="mt-4 w-full rounded-xl border border-exchange-accent/40 bg-exchange-accent/10 px-4 py-2.5 text-sm font-semibold text-exchange-accent transition-all duration-200 hover:border-exchange-accent/70 hover:bg-exchange-accent/20 hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-exchange-accent/30 border-t-exchange-accent" />
            Running 50 cycles…
          </span>
        ) : (
          "🚀  Run 50-Cycle Demo"
        )}
      </button>

      {result && (
        <div className="mt-2 rounded-lg border border-exchange-success/30 bg-exchange-success/8 px-3 py-2 text-center">
          <p className="text-[11px] font-semibold text-exchange-success">
            ✓ {result.completed} cycles · ${result.totalUsdc} USDC settled
          </p>
        </div>
      )}
      {error && <p className="mt-2 text-center text-[11px] text-red-400">{error}</p>}
    </section>
  );
}
