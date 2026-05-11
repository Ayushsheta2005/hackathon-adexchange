import type { JSX } from "react";
import { useCallback } from "react";

import { NexusChatThread } from "../components/nexus/NexusChatThread.js";
import { NexusTopBar } from "../components/nexus/NexusTopBar.js";
import { SellerYieldComposer } from "../components/nexus/SellerYieldComposer.js";
import { SellerYieldRightPanel } from "../components/nexus/SellerYieldRightPanel.js";
import { useSellerAssistantChat } from "../hooks/useSellerAssistantChat.js";

export function SellerAssistantPage(): JSX.Element {
  const {
    messages,
    sending,
    composerTyping,
    sendChip,
    sendComposerMessage,
    appendUserMessage,
    cancelPendingGeneration,
    chipSuggestions,
  } = useSellerAssistantChat();

  const onNewDealInChat = useCallback(() => {
    appendUserMessage("+ New deal — walk me through a **PMP draft** in Configure deal mode.");
  }, [appendUserMessage]);

  return (
    <>
      <NexusTopBar primary="Yield" secondary="Supply assistant" />
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)]">
        <div className="flex min-h-0 flex-col border-r border-white/10 bg-[#0a0f1a]">
          <NexusChatThread
            messages={messages}
            assistantPending={sending}
            composerTyping={composerTyping}
            assistantAgentLabel="SELLER AGENT"
            assistantTypingName="Nexus"
          />
          <div className="shrink-0 border-t border-white/10 px-6 pb-2">
            <div className="mx-auto flex max-w-2xl flex-wrap gap-2 pt-2">
              {chipSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={composerTyping || sending}
                  onClick={() => sendChip(s)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-left text-[11.5px] text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 disabled:opacity-40 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <SellerYieldComposer
            disabled={composerTyping || sending}
            pending={composerTyping || sending}
            onCancel={cancelPendingGeneration}
            onSend={sendComposerMessage}
          />
        </div>
        <SellerYieldRightPanel onNewDealInChat={onNewDealInChat} />
      </div>
    </>
  );
}
