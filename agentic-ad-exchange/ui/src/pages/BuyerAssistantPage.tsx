import type { JSX } from "react";

import { NexusChatThread } from "../components/nexus/NexusChatThread.js";
import { NexusComposer } from "../components/nexus/NexusComposer.js";
import { NexusRightPanel } from "../components/nexus/NexusRightPanel.js";
import { NexusTopBar } from "../components/nexus/NexusTopBar.js";
import { useDashboardData } from "../context/DashboardDataContext.js";
import { useBuyerAssistantChat } from "../hooks/useBuyerAssistantChat.js";

export function BuyerAssistantPage(): JSX.Element {
  const data = useDashboardData();
  const {
    messages,
    sending,
    composerTyping,
    sendWithHistory,
    sendComposerMessage,
    cancelPendingGeneration,
    chipSuggestions,
  } = useBuyerAssistantChat();

  return (
    <>
      <NexusTopBar primary="Nexus" secondary="Exchange assistant" />
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)]">
        <div className="flex min-h-0 flex-col border-r border-white/10 bg-[#0a0f1a]">
          <NexusChatThread
            messages={messages}
            assistantPending={sending}
            composerTyping={composerTyping}
            assistantAgentLabel="BUYER AGENT"
            assistantTypingName="Nexus"
          />
          <div className="shrink-0 border-t border-white/10 px-6 pb-2">
            <div className="mx-auto flex max-w-2xl flex-wrap gap-2 pt-2">
              {chipSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={sending || composerTyping}
                  onClick={() => void sendWithHistory(s)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-left text-[11.5px] text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 disabled:opacity-40 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <NexusComposer
            disabled={sending || composerTyping}
            pending={sending || composerTyping}
            onCancel={cancelPendingGeneration}
            onSend={(t, mode) => sendComposerMessage(t, mode)}
          />
        </div>
        <NexusRightPanel
          connected={data.connected}
          paused={data.control.paused}
          settlementCount={data.settlementCount}
          bidCount={data.bids.length}
          listingCount={data.listings.length}
          lastAuction={data.lastAuction}
          lastReceipt={data.lastReceipt}
          control={data.control}
        />
      </div>
    </>
  );
}
