export function MarginExplainer(): JSX.Element {
  return (
    <section
      role="region"
      aria-label="Margin explainer"
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-exchange-accent/10 text-sm">
          💡
        </span>
        <h2 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          Why This Model Needs Circle Arc
        </h2>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/6">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/6 bg-white/3">
              <th className="px-4 py-2.5 font-mono font-medium text-slate-500">Rail</th>
              <th className="px-4 py-2.5 font-mono font-medium text-slate-500">Per-impression cost</th>
              <th className="px-4 py-2.5 font-mono font-medium text-slate-500">Gas</th>
              <th className="px-4 py-2.5 font-mono font-medium text-slate-500">AI agents?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/4 transition-colors hover:bg-white/3">
              <td className="px-4 py-3 text-slate-400">Stripe (fixed fee)</td>
              <td className="px-4 py-3 font-mono text-slate-400">$0.30 + 2.9%</td>
              <td className="px-4 py-3 font-mono text-slate-600">n/a</td>
              <td className="px-4 py-3">
                <span className="rounded-md bg-exchange-warn/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-exchange-warn">
                  ✗ No
                </span>
              </td>
            </tr>
            <tr className="border-b border-white/4 transition-colors hover:bg-white/3">
              <td className="px-4 py-3 text-slate-400">ERC-20 on L1/L2</td>
              <td className="px-4 py-3 font-mono text-slate-400">+ $0.01–$10 gas</td>
              <td className="px-4 py-3 font-mono text-slate-500">variable</td>
              <td className="px-4 py-3">
                <span className="rounded-md bg-exchange-warn/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-exchange-warn">
                  ✗ No
                </span>
              </td>
            </tr>
            <tr className="transition-colors hover:bg-exchange-accent/5">
              <td className="px-4 py-3 font-semibold text-slate-200">Circle Arc Nanopayments</td>
              <td className="px-4 py-3 font-mono font-bold text-exchange-accent">≤ $0.01</td>
              <td className="px-4 py-3 font-mono font-bold text-exchange-success">$0.00</td>
              <td className="px-4 py-3">
                <span className="rounded-md border border-exchange-success/30 bg-exchange-success/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-exchange-success">
                  ✓ Yes
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-600">
        Traditional rails carry a ~$0.30 fixed fee floor. Programmatic ad auctions at sub-cent
        clearing prices are uneconomic on every rail except{" "}
        <span className="text-exchange-accent">Circle Nanopayments on Arc</span>.
      </p>
    </section>
  );
}
