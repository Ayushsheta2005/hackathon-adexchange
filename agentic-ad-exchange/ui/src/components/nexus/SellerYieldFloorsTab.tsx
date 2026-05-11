import type { JSX } from "react";

import type { YieldFloorRow } from "./yieldPanelTypes.js";

export interface SellerYieldFloorsTabProps {
  rows: YieldFloorRow[];
  floorDrafts: Record<string, string>;
  onFloorDraft: (id: string, v: string) => void;
  editingFloorId: string | null;
  onEditingFloorId: (id: string | null) => void;
  onCommitFloor: (id: string) => void;
}

function signalLabel(signal: YieldFloorRow["signal"]): string {
  if (signal === "calibrated") return "Calibrated ✓";
  if (signal === "too_high") return "Too high ↓";
  return "Too low ↑";
}

function signalClass(signal: YieldFloorRow["signal"]): string {
  if (signal === "calibrated") return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
  if (signal === "too_high") return "text-red-400 border-red-500/30 bg-red-500/10";
  return "text-amber-400 border-amber-500/30 bg-amber-500/10";
}

export function SellerYieldFloorsTab({
  rows,
  floorDrafts,
  onFloorDraft,
  editingFloorId,
  onEditingFloorId,
  onCommitFloor,
}: SellerYieldFloorsTabProps): JSX.Element {
  return (
    <div className="space-y-3">
      <p className="text-[12.5px] text-slate-500">
        Placements, floors, and fill signals (demo).
      </p>
      <ul className="list-none space-y-3 p-0">
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="text-[13px] font-semibold text-slate-200">{row.placement}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-nexus-mono text-[12px] text-cyan-400">{row.floor}</span>
                  <span className="text-slate-600">·</span>
                  <span className="font-nexus-mono text-[11px] text-slate-400">Fill {row.fillPct}</span>
                  <span className="text-slate-600">·</span>
                  <span className={`rounded-full border px-2 py-0.5 font-nexus-mono text-[10px] font-semibold ${signalClass(row.signal)}`}>
                    {signalLabel(row.signal)}
                  </span>
                </div>
              </div>
              {editingFloorId === row.id ? (
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    className="w-28 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 font-nexus-mono text-[12px] text-slate-200 focus:border-cyan-500/50 focus:outline-none"
                    value={floorDrafts[row.id] ?? row.floor}
                    onChange={(e) => onFloorDraft(row.id, e.target.value)}
                    aria-label={`New floor for ${row.placement}`}
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-cyan-500 px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-cyan-400 transition-colors"
                    onClick={() => onCommitFloor(row.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
                    onClick={() => onEditingFloorId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
                  onClick={() => {
                    onFloorDraft(row.id, row.floor);
                    onEditingFloorId(row.id);
                  }}
                >
                  Edit floor
                </button>
              )}
            </div>
            <p className="mt-3 text-[11.5px] leading-snug text-slate-500">{row.hint}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
