import type { JSX } from "react";
import { useEffect, useRef } from "react";

import { NexusAssistantTypingRow } from "./NexusAssistantTypingRow.js";
import {
  NexusMessageBubble,
  type AssistantAgentLabel,
  type ChatLine,
} from "./NexusMessageBubble.js";

export interface NexusChatThreadProps {
  messages: ChatLine[];
  /** When true, shows an inline status row so the thread is not empty while the assistant request is in flight. */
  assistantPending?: boolean;
  /** Composer simulation: typing row before canned reply. */
  composerTyping?: boolean;
  assistantAgentLabel?: AssistantAgentLabel;
  /** Row label while typing (defaults to Nexus). */
  assistantTypingName?: string;
}

export function NexusChatThread({
  messages,
  assistantPending = false,
  composerTyping = false,
  assistantAgentLabel = "BUYER AGENT",
  assistantTypingName = "Nexus",
}: NexusChatThreadProps): JSX.Element {
  const endRef = useRef<HTMLDivElement>(null);
  const showTyping = assistantPending || composerTyping;
  useEffect(() => {
    const el = endRef.current;
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, showTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-7 font-nexus">
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="h-px flex-1 bg-[oklch(0.94_0.004_80)]" />
          <span className="font-nexus-mono text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.62_0.006_80)]">
            Today
          </span>
          <div className="h-px flex-1 bg-[oklch(0.94_0.004_80)]" />
        </div>
        {messages.map((m) => (
          <NexusMessageBubble key={m.id} message={m} assistantAgentLabel={assistantAgentLabel} />
        ))}
        {assistantPending ? <NexusAssistantTypingRow assistantName={assistantTypingName} /> : null}
        {composerTyping && !assistantPending ? (
          <NexusAssistantTypingRow assistantName={assistantTypingName} />
        ) : null}
        <div ref={endRef} />
      </div>
    </div>
  );
}
