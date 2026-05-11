import type { JSX } from "react";
import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";

import { AssistantComposerPlusModeRow } from "./AssistantComposerPlusModeRow.js";
import { IconPaperclip, IconQuickBolt, IconStopGeneration } from "./NexusComposerIcons.js";

const MAX = 4000;

const TEXTAREA_MIN_HEIGHT_PX = 22;
const TEXTAREA_MAX_HEIGHT_PX = 52;

export interface AssistantComposerModeField {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
  /** Classes appended to `nexus-composer-pill` when this mode is active (include contrast text). */
  pillOnClassName: string;
}

function fitComposerTextarea(el: HTMLTextAreaElement): void {
  el.style.height = "auto";
  const sh = el.scrollHeight;
  const h = Math.min(Math.max(sh, TEXTAREA_MIN_HEIGHT_PX), TEXTAREA_MAX_HEIGHT_PX);
  el.style.height = `${h}px`;
  el.style.overflowY = sh > TEXTAREA_MAX_HEIGHT_PX ? "auto" : "hidden";
}

export interface AssistantModeComposerProps {
  modes: readonly AssistantComposerModeField[];
  defaultModeId: string;
  /** Mode to select after a successful send (e.g. buyer `direct`, seller `ask`). */
  resetModeIdAfterSend: string;
  messageAriaLabel: string;
  quickInsertText?: string;
  disabled?: boolean;
  /** When true, composer is in a “thinking” state — send becomes a stop control if `onCancel` is set. */
  pending?: boolean;
  /** Invoked when the user clicks stop while `pending` (aborts API or local simulation). */
  onCancel?: () => void;
  onSend: (text: string, modeId: string) => void;
  renderModeIcon: (modeId: string) => JSX.Element;
  /** `plus`: general + menu (seller). `select`: native select. `pills`: buyer chips. */
  modePicker?: "pills" | "select" | "plus";
  /** When `modePicker="plus"`, a11y for + button and menu (defaults: Add mode / Structured modes). */
  plusPickerAriaLabel?: string;
  plusPickerTitle?: string;
  plusMenuAriaLabel?: string;
}

export function AssistantModeComposer({
  modes,
  defaultModeId,
  resetModeIdAfterSend,
  messageAriaLabel,
  quickInsertText,
  disabled,
  pending,
  onCancel,
  onSend,
  renderModeIcon,
  modePicker = "pills",
  plusPickerAriaLabel,
  plusPickerTitle,
  plusMenuAriaLabel,
}: AssistantModeComposerProps): JSX.Element {
  const modeSelectId = useId();
  const [text, setText] = useState("");
  const [mode, setMode] = useState(defaultModeId);
  const [showEmptyHint, setShowEmptyHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const modeMeta = modes.find((x) => x.id === mode) ?? modes[0];

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (el) {
      fitComposerTextarea(el);
    }
  }, [text]);

  const send = useCallback(() => {
    const t = text.trim();
    if (!t) {
      setShowEmptyHint(true);
      return;
    }
    setShowEmptyHint(false);
    onSend(t, mode);
    setText("");
    setMode(resetModeIdAfterSend);
  }, [onSend, text, mode, resetModeIdAfterSend]);

  const handleQuickAction = useCallback(() => {
    if (quickInsertText) {
      setText(quickInsertText.slice(0, MAX));
      setShowEmptyHint(false);
      setMode(defaultModeId);
    }
  }, [quickInsertText, defaultModeId]);

  const composerShellClass = showEmptyHint
    ? "nexus-composer nexus-composer--invalid"
    : "nexus-composer nexus-composer--live";

  return (
    <div className="nexus-composer-wrap font-nexus">
      <div className="mx-auto min-w-0 max-w-2xl">
        <div className={composerShellClass}>
          <div className="nexus-composer-input">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value.slice(0, MAX));
                setShowEmptyHint(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!pending) {
                    send();
                  }
                }
              }}
              disabled={disabled}
              rows={1}
              placeholder={modeMeta?.placeholder ?? ""}
              aria-label={messageAriaLabel}
            />
          </div>
          <div className="nexus-composer-bar">
            {modePicker === "select" ? (
              <div className="nexus-composer-mode-select-wrap">
                <label htmlFor={modeSelectId} className="nexus-composer-mode-select-label">
                  Mode
                </label>
                <div className="nexus-composer-mode-select-inner">
                  <span className="nexus-composer-mode-select-icon" aria-hidden>
                    {renderModeIcon(mode)}
                  </span>
                  <select
                    id={modeSelectId}
                    className="nexus-composer-mode-select"
                    value={mode}
                    disabled={disabled || pending}
                    onChange={(e) => setMode(e.target.value)}
                  >
                    {modes.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : modePicker === "plus" ? (
              <AssistantComposerPlusModeRow
                modes={modes}
                mode={mode}
                setMode={setMode}
                disabled={disabled}
                pending={pending}
                renderModeIcon={renderModeIcon}
                plusPickerAriaLabel={plusPickerAriaLabel}
                plusPickerTitle={plusPickerTitle}
                plusMenuAriaLabel={plusMenuAriaLabel}
              />
            ) : (
              modes.map((m) => {
                const selected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    disabled={disabled || pending}
                    aria-pressed={selected}
                    className={`nexus-composer-pill${selected ? ` ${m.pillOnClassName}` : ""}`}
                    onClick={() => setMode(m.id)}
                  >
                    {renderModeIcon(m.id)}
                    {m.label}
                  </button>
                );
              })
            )}
            <div className="nexus-composer-actions">
              <button
                type="button"
                disabled={disabled}
                title="Attach"
                aria-label="Attach file (demo — not wired)"
                className="nexus-composer-icon-btn"
              >
                <IconPaperclip />
              </button>
              {quickInsertText ? (
                <button
                  type="button"
                  disabled={disabled}
                  title="Quick action"
                  aria-label="Quick action: insert sample instruction"
                  onClick={handleQuickAction}
                  className="nexus-composer-icon-btn"
                >
                  <IconQuickBolt />
                </button>
              ) : null}
              {pending && onCancel ? (
                <button
                  type="button"
                  onClick={onCancel}
                  className="nexus-composer-stop"
                  aria-label="Stop generation"
                  title="Stop"
                >
                  <IconStopGeneration />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={send}
                  disabled={disabled}
                  className="nexus-composer-send"
                  aria-label="Send message"
                  title="Send"
                >
                  <span className="nexus-composer-send-char" aria-hidden>
                    ↑
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
        {showEmptyHint ? (
          <p className="mt-2 text-center text-xs text-amber-800" role="alert">
            Enter a message before sending.
          </p>
        ) : null}
        <p className="nexus-composer-foot">
          <span>
            {text.length}/{MAX} · Enter send · Shift+Enter newline
            {pending ? " · Stop cancels generation" : ""}
          </span>
          <span>{modeMeta?.hint ?? ""}</span>
        </p>
      </div>
    </div>
  );
}
