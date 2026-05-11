import type { JSX } from "react";

import type { NexusComposerMode } from "../../assistant/nexusComposerSimulation.js";

import { AssistantModeComposer } from "./AssistantModeComposer.js";
import {
  BUYER_COMPOSER_MODES,
  BUYER_QUICK_INSERT,
  renderBuyerComposerIcon,
} from "./buyerComposerModes.js";

export type { NexusComposerMode } from "../../assistant/nexusComposerSimulation.js";

export interface NexusComposerProps {
  disabled?: boolean;
  pending?: boolean;
  onCancel?: () => void;
  onSend: (text: string, mode: NexusComposerMode) => void;
}

export function NexusComposer({
  disabled,
  pending,
  onCancel,
  onSend,
}: NexusComposerProps): JSX.Element {
  return (
    <AssistantModeComposer
      modes={BUYER_COMPOSER_MODES}
      defaultModeId="direct"
      resetModeIdAfterSend="direct"
      messageAriaLabel="Message to Nexus"
      quickInsertText={BUYER_QUICK_INSERT}
      disabled={disabled}
      pending={pending}
      onCancel={onCancel}
      onSend={(text, modeId) => onSend(text, modeId as NexusComposerMode)}
      renderModeIcon={renderBuyerComposerIcon}
      modePicker="plus"
      plusPickerAriaLabel="Add Nexus mode"
      plusPickerTitle="Add Nexus mode"
      plusMenuAriaLabel="Nexus assistant modes"
    />
  );
}
