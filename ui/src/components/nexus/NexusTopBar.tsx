import type { JSX } from "react";

export interface NexusTopBarProps {
  primary: string;
  secondary: string;
}

export function NexusTopBar({ primary, secondary }: NexusTopBarProps): JSX.Element {
  const now = new Date();
  return (
    <header
      aria-label="Assistant workspace header"
      className="flex h-[52px] shrink-0 items-center gap-3 border-b border-white/10 bg-[#0a0f1a] px-5 font-nexus"
    >
      <div className="flex items-center gap-2 text-[12.5px] text-slate-400">
        <div className="mr-1 flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg shadow-cyan-500/20">
          <span className="text-[9px] font-bold text-white">NX</span>
        </div>
        <span className="font-semibold text-white">{primary}</span>
        <span className="text-slate-600">/</span>
        <span>{secondary}</span>
      </div>
      <div className="ml-auto flex items-center gap-3 font-nexus-mono text-[11.5px] text-slate-400">
        <span className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-cyan-400">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
          LIVE
        </span>
        <span className="hidden sm:inline text-slate-500">{now.toLocaleDateString()}</span>
      </div>
    </header>
  );
}
