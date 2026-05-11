import type { AuctionResult, SettlementReceipt } from "@ade/shared";
import type { JSX } from "react";
import { useId } from "react";

import type { ControlStateHandle } from "../../hooks/useControlState.js";

import { NexusAnalyzeMode } from "./NexusAnalyzeMode.js";
import { NexusCreateMode } from "./NexusCreateMode.js";
import { NexusMonitorMode } from "./NexusMonitorMode.js";
import { NexusReviewMode } from "./NexusReviewMode.js";
import type { NexusPanelMode } from "./nexusRightPanelTypes.js";
import { useNexusRightPanelState } from "./useNexusRightPanelState.js";

export interface NexusRightPanelProps {
  connected: boolean;
  paused: boolean;
  settlementCount: number;
  bidCount: number;
  listingCount: number;
  lastAuction: AuctionResult | null;
  lastReceipt: SettlementReceipt | null;
  control: ControlStateHandle;
}

const MODES: { id: NexusPanelMode; label: string; badge?: "review" }[] = [
  { id: "monitor", label: "Monitor" },
  { id: "create", label: "Create" },
  { id: "review", label: "Review", badge: "review" },
  { id: "analyze", label: "Analyze" },
];

export function NexusRightPanel({
  connected,
  paused,
  settlementCount,
  bidCount,
  listingCount,
  lastAuction,
  lastReceipt,
  control,
}: NexusRightPanelProps): JSX.Element {
  const s = useNexusRightPanelState();
  const tablistId = useId();

  const exchange = {
    connected,
    paused,
    settlementCount,
    bidCount,
    listingCount,
    lastAuction,
    lastReceipt,
  };

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col border-l border-white/10 bg-[#0d1220] font-nexus">
      <div className="flex shrink-0 flex-col gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[13px] font-semibold text-slate-200">Nexus workspace</h2>
          <span className="font-nexus-mono text-[10.5px] text-slate-500">demo</span>
        </div>
        <div
          id={tablistId}
          role="tablist"
          aria-label="Nexus workspace modes"
          className="flex flex-wrap gap-1 rounded-lg border border-white/10 bg-white/5 p-1"
        >
          {MODES.map((m) => {
            const selected = s.activeMode === m.id;
            const reviewCount = m.badge === "review" ? s.pendingDecisions.length : 0;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`${tablistId}-${m.id}`}
                onClick={() => s.setActiveMode(m.id)}
                className={`relative flex flex-1 items-center justify-center gap-1 rounded-md py-2 text-center font-nexus-mono text-[10px] font-semibold uppercase tracking-wide min-w-[4.5rem] transition-colors ${
                  selected
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {m.label}
                {m.badge === "review" && reviewCount > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-amber-500 px-1 font-nexus-mono text-[9px] font-bold text-white">
                    {reviewCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        aria-labelledby={`${tablistId}-${s.activeMode}`}
        className={`min-h-0 flex-1 overflow-y-auto bg-[#0d1220] p-5 transition-opacity duration-200 ${
          s.panelEntering ? "opacity-0" : "opacity-100"
        }`}
      >
        {s.activeMode === "monitor" ? (
          <NexusMonitorMode
            exceptions={s.exceptions}
            showAllExceptions={s.showAllExceptions}
            onShowAllExceptions={s.setShowAllExceptions}
            exchangeOpen={s.exchangePulseOpen}
            onExchangeOpen={s.setExchangePulseOpen}
            exchange={exchange}
            control={control}
            settledDisplay={s.settledDisplay}
            winRateDisplay={s.winRateDisplay}
            burnDisplay={s.burnDisplay}
            savedDisplay={s.savedDisplay}
            autoExecutedToday={s.autoExecutedToday}
            totalDecisionsToday={s.totalDecisionsToday}
          />
        ) : null}
        {s.activeMode === "create" ? (
          <NexusCreateMode
            step={s.createStep}
            onStep={s.setCreateStep}
            objectiveText={s.objectiveText}
            onObjectiveText={s.setObjectiveText}
            parsedChips={s.parsedChips}
            ssps={s.ssps}
            onToggleSsp={s.toggleSsp}
            dealsOpen={s.dealsOpen}
            onDealsOpen={s.setDealsOpen}
            maxCpm={s.maxCpm}
            onMaxCpm={s.setMaxCpm}
            dailyDelta={s.dailyDelta}
            onDailyDelta={s.setDailyDelta}
            approvalGate={s.approvalGate}
            onApprovalGate={s.setApprovalGate}
            rotation={s.rotation}
            onRotation={s.setRotation}
            policySummary={s.policySummary}
            onLaunch={s.launchCampaign}
            onSaveDraft={s.saveDraft}
          />
        ) : null}
        {s.activeMode === "review" ? (
          <NexusReviewMode
            pending={s.pendingDecisions}
            resolved={s.resolvedHistory}
            expandedId={s.expandedReviewId}
            onExpandedId={s.setExpandedReviewId}
            dontAskAgain={s.dontAskAgain}
            onDontAskAgain={s.setDontAskAgain}
            exitingIds={s.exitingDecisionIds}
            onResolve={s.resolveDecision}
            autoExecutedToday={s.autoExecutedToday}
          />
        ) : null}
        {s.activeMode === "analyze" ? (
          <NexusAnalyzeMode
            period={s.analyzePeriod}
            onPeriod={s.setAnalyzePeriod}
            applyNext={s.applyNext}
            onApplyNext={s.setApplyNext}
          />
        ) : null}
      </div>
    </section>
  );
}
