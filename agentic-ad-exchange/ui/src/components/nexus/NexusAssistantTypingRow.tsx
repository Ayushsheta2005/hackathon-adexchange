import type { JSX } from "react";

export interface NexusAssistantTypingRowProps {
  /** Shown next to the typing dots (defaults to Nexus). */
  assistantName?: string;
}

/** Typing indicator styled like a Nexus assistant bubble (CSS-only dots). */
export function NexusAssistantTypingRow({
  assistantName = "Nexus",
}: NexusAssistantTypingRowProps): JSX.Element {
  return (
    <div className="flex gap-3.5" aria-live="polite">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 font-nexus-mono text-[10px] font-semibold tracking-wide text-white shadow-lg shadow-cyan-500/20">
        NX
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-baseline gap-2">
          <span className="text-[13px] font-semibold text-slate-200">
            {assistantName}
          </span>
          <span className="font-nexus-mono text-[10.5px] text-slate-500">typing…</span>
        </div>
        <div
          className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 shadow-sm backdrop-blur-sm"
          aria-label={`${assistantName} is typing`}
        >
          <span className="nexus-typing-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span className="nexus-typing-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span className="nexus-typing-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </div>
      </div>
    </div>
  );
}
