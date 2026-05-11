import type { AssistantUiBlock } from "@ade/shared";
import type { JSX } from "react";

import type { NexusComposerMode } from "../../assistant/nexusComposerSimulation.js";
import type { SellerComposerMode } from "../../assistant/sellerComposerSimulation.js";

import { NexusAssistantBlocks } from "./NexusAssistantBlocks.js";
import { renderBoldMarkdown } from "./inlineBold.js";

export type AssistantAgentLabel = "BUYER AGENT" | "SELLER AGENT";

export interface ChatLine {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  usedFallback?: boolean;
  /** Local-only canned reply from suggestion chips (no API call). */
  demoPreview?: boolean;
  blocks?: AssistantUiBlock[];
  /** Buyer composer: goal/policy accent (direct omitted). */
  userComposerMode?: NexusComposerMode;
  /** Seller composer: mode used when sending (analyze uses default bubble). */
  userSellerMode?: SellerComposerMode;
}

function userComposerTag(message: ChatLine): { label: string; labelClass: string } | null {
  if (message.userComposerMode === "goal") {
    return { label: "Goal updated", labelClass: "text-[10px] font-semibold text-amber-700" };
  }
  if (message.userComposerMode === "policy") {
    return { label: "Policy added", labelClass: "text-[10px] font-semibold text-blue-700" };
  }
  if (message.userSellerMode === "set_floor") {
    return { label: "Floor instruction", labelClass: "text-[10px] font-semibold text-amber-700" };
  }
  if (message.userSellerMode === "configure_deal") {
    return { label: "Deal draft", labelClass: "text-[10px] font-semibold text-blue-700" };
  }
  if (message.userSellerMode === "block_buyer") {
    return { label: "Block rule", labelClass: "text-[10px] font-semibold text-red-700" };
  }
  return null;
}

function userBubbleClassName(message: ChatLine): string {
  const base =
    "rounded-xl border px-3.5 py-2.5 text-left text-[13.5px] leading-relaxed text-slate-200 shadow-sm inline-block";
  const buyer = message.userComposerMode;
  if (buyer === "goal") {
    return `${base} border-white/10 border-l-4 border-l-amber-400 bg-white/5`;
  }
  if (buyer === "policy") {
    return `${base} border-white/10 border-l-4 border-l-blue-500 bg-white/5`;
  }
  const seller = message.userSellerMode;
  if (seller === "set_floor") {
    return `${base} border-white/10 border-l-4 border-l-amber-500 bg-white/5`;
  }
  if (seller === "configure_deal") {
    return `${base} border-white/10 border-l-4 border-l-blue-500 bg-white/5`;
  }
  if (seller === "block_buyer") {
    return `${base} border-white/10 border-l-4 border-l-red-500 bg-white/5`;
  }
  return `${base} border-white/10 bg-white/5`;
}

export interface NexusMessageBubbleProps {
  message: ChatLine;
  assistantAgentLabel?: AssistantAgentLabel;
}

export function NexusMessageBubble({
  message,
  assistantAgentLabel = "BUYER AGENT",
}: NexusMessageBubbleProps): JSX.Element {
  const isUser = message.role === "user";
  const userTag = isUser ? userComposerTag(message) : null;
  const assistantName = "Nexus";
  return (
    <article
      className={`flex gap-3.5 ${isUser ? "flex-row-reverse" : ""}`}
      aria-label={isUser ? "You" : `${assistantName} assistant`}
    >
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold tracking-wide ${
          isUser
            ? "bg-slate-700 text-slate-300"
            : "bg-gradient-to-br from-cyan-400 to-violet-500 font-nexus-mono text-white shadow-lg shadow-cyan-500/20"
        }`}
      >
        {isUser ? "You" : "NX"}
      </div>
      <div className={`min-w-0 flex-1 ${isUser ? "text-right" : ""}`}>
        <div className={`mb-1 flex flex-wrap items-baseline gap-2 ${isUser ? "justify-end" : ""}`}>
          <span className="text-[13px] font-semibold text-slate-200">
            {isUser ? "You" : assistantName}
          </span>
          {!isUser && (
            <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 font-nexus-mono text-[10px] text-slate-400">
              {assistantAgentLabel}
            </span>
          )}
          {!isUser && message.demoPreview && (
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400">
              demo preview
            </span>
          )}
          {!isUser && message.usedFallback && (
            <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
              offline summary
            </span>
          )}
          <time
            className="font-nexus-mono text-[10.5px] text-slate-500"
            dateTime={message.createdAt}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>
        {userTag ? (
          <p className={`mb-1.5 ${isUser ? "text-right" : ""}`}>
            <span className={userTag.labelClass}>{userTag.label}</span>
          </p>
        ) : null}
        <div
          className={
            isUser
              ? userBubbleClassName(message)
              : "rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-left text-[13.5px] leading-relaxed text-slate-200 shadow-sm backdrop-blur-sm"
          }
        >
          <div className="whitespace-pre-wrap">{renderBoldMarkdown(message.content)}</div>
          {!isUser && message.blocks != null && message.blocks.length > 0 ? (
            <NexusAssistantBlocks blocks={message.blocks} />
          ) : null}
        </div>
      </div>
    </article>
  );
}
