import type { JSX } from "react";

import type { AssistantComposerModeField } from "./AssistantModeComposer.js";
import { IconBolt, IconClock, IconTag } from "./NexusComposerIcons.js";

/** Left-to-right: default Q&A → objective → durable rules (constraints after intent). */
export const BUYER_COMPOSER_MODES: readonly AssistantComposerModeField[] = [
  {
    id: "direct",
    label: "Direct Nexus",
    placeholder: "Ask about auctions, bids, settlements, or what to do next...",
    hint: "Tap + for goal or policy — × clears · context from live exchange feed",
    pillOnClassName: "nexus-composer-pill--on",
  },
  {
    id: "goal",
    label: "Set goal",
    placeholder: "What should Nexus optimize for? e.g. Maximize VCR for Nike 1P...",
    hint: "Updates campaign objective",
    pillOnClassName: "nexus-composer-pill--on",
  },
  {
    id: "policy",
    label: "Set policy",
    placeholder: "Define a rule for Nexus. e.g. Never bid above $15 CPM on Disney+...",
    hint: "Adds a permanent rule to Nexus",
    pillOnClassName: "nexus-composer-pill--on",
  },
];

export const BUYER_QUICK_INSERT =
  "Bid $5 CPM on YouTube CTV for Nike 1P, $20K daily cap, run through Sunday.";

export function renderBuyerComposerIcon(modeId: string): JSX.Element {
  if (modeId === "goal") {
    return <IconTag />;
  }
  if (modeId === "policy") {
    return <IconClock />;
  }
  return <IconBolt />;
}
