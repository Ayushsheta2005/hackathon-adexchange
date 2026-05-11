export interface TransactionCounterProps {
  count: number;
}

/** ≥ 50 confirmed settlements is the hackathon submission gate. */
const HACKATHON_GATE = 50;

export function TransactionCounter({ count }: TransactionCounterProps): JSX.Element {
  const met = count >= HACKATHON_GATE;
  const progress = Math.min((count / HACKATHON_GATE) * 100, 100);

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
            met
              ? "bg-exchange-success shadow-glow-green"
              : "bg-exchange-accent"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status label */}
      <p
        className={`mt-2 text-xs font-medium ${met ? "text-exchange-success" : "text-slate-500"}`}
      >
        {met
          ? `✓ Hackathon target met (≥ ${HACKATHON_GATE} confirmed)`
          : `${count}/${HACKATHON_GATE} confirmed settlements`}
      </p>

      {met && (
        <div className="mt-2 rounded-lg border border-exchange-success/30 bg-exchange-success/10 px-3 py-1.5 text-center">
          <span className="text-[11px] font-semibold text-exchange-success">🎯 Gate reached</span>
        </div>
      )}
    </section>
  );
}
