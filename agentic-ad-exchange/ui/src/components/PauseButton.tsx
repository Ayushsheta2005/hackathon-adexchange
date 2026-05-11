export interface PauseButtonProps {
  paused: boolean;
  pending: boolean;
  onPause: () => void;
  onResume: () => void;
}

export function PauseButton({ paused, pending, onPause, onResume }: PauseButtonProps): JSX.Element {
  const handleClick = (): void => {
    if (pending) return;
    if (paused) onResume();
    else onPause();
  };

  const label = pending
    ? paused
      ? "Resuming…"
      : "Pausing…"
    : paused
      ? "▶ Resume Demo"
      : "⏸ Pause Demo";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
        paused
          ? "border border-exchange-success/40 bg-exchange-success/10 text-exchange-success hover:bg-exchange-success/20 hover:shadow-glow-green"
          : "border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
      }`}
      aria-pressed={paused}
      aria-label={paused ? "Resume demo" : "Pause demo"}
    >
      {label}
    </button>
  );
}
