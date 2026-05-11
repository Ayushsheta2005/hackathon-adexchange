import type { ResolvedDecision, ReviewDecision } from "./nexusRightPanelTypes.js";

export interface MockSsp {
  id: string;
  name: string;
  enabled: boolean;
  warnLowWinRate?: boolean;
}

export interface MockPmp {
  id: string;
  label: string;
  status: "active" | "draft";
}

export interface PacingBar {
  name: string;
  pct: number;
  label: string;
}

export interface AnalyzeChannelRow {
  channel: string;
  imps: string;
  winPct: string;
  vcr: string;
  ecpm: string;
  vsGoal: string;
  tone: "beat" | "track" | "miss";
}

export const MOCK_SSPS: MockSsp[] = [
  { id: "netflix", name: "Netflix", enabled: true },
  { id: "youtube", name: "YouTube", enabled: true },
  { id: "prime_video", name: "Prime Video", enabled: true },
  { id: "disney_plus", name: "Disney+", enabled: false, warnLowWinRate: true },
];

export const MOCK_PMPS: MockPmp[] = [
  { id: "PMP-8891", label: "HBO Max Premiere", status: "active" },
  { id: "PMP-4421", label: "Paramount+ Sports", status: "draft" },
];

export const MOCK_PACING: PacingBar[] = [
  { name: "Netflix", pct: 85, label: "accelerated" },
  { name: "YouTube", pct: 45, label: "on-track" },
  { name: "Prime Video", pct: 92, label: "capped" },
  { name: "Disney+", pct: 15, label: "paused" },
];

export const MOCK_ANALYZE_ROWS: AnalyzeChannelRow[] = [
  {
    channel: "Netflix",
    imps: "14.5M",
    winPct: "78%",
    vcr: "96%",
    ecpm: "$24.50",
    vsGoal: "+5.2%",
    tone: "beat",
  },
  {
    channel: "YouTube",
    imps: "8.2M",
    winPct: "61%",
    vcr: "89%",
    ecpm: "$14.80",
    vsGoal: "+1.1%",
    tone: "track",
  },
  {
    channel: "Prime Video",
    imps: "5.4M",
    winPct: "42%",
    vcr: "92%",
    ecpm: "$19.30",
    vsGoal: "−2.4%",
    tone: "miss",
  },
];

export type CreativeRotation = "auto_vcr" | "auto_ctr" | "ab" | "manual";

export const CREATIVE_ROTATION_LABELS: Record<CreativeRotation, string> = {
  auto_vcr: "Auto VCR",
  auto_ctr: "Auto CTR",
  ab: "A/B test",
  manual: "Manual",
};

export const INITIAL_REVIEW_DECISIONS: ReviewDecision[] = [
  {
    id: "rev-101",
    tag: "NEGO",
    title: "Premium Floor Lift — Paramount+ Sports",
    summary: "Publisher counter-offered $28.50 vs our $24.00 target.",
    age: "5m",
    context:
      "PMP-4421 Paramount+ Sports is highly competitive during the playoffs; they proposed a +18% floor increase.",
    reasoning: [
      "Our historical win rate is 82% when bidding above $26 CPM.",
      "Campaign pacing is extremely healthy, giving us buffer.",
      "Accepting guarantees premium inventory; rejecting risks losing to rival brands.",
    ],
    impact: "≈ +$4,200 incremental spend if accepted; expected VCR lift of +4%.",
    primaryLabel: "Accept $28.50",
    secondaryLabel: "Counter $26.00",
    dangerLabel: "Walk away",
  },
  {
    id: "rev-102",
    tag: "DECISION",
    title: "Reallocate $50k to Netflix",
    summary: "Netflix VCR is outperforming goal by 5%; Prime Video is lagging.",
    age: "18m",
    context:
      "Nike 1P campaign: Nexus detected an arbitrage opportunity in Netflix prime-time slots.",
    reasoning: [
      "Netflix audience overlap with Nike 1P is hitting 94% accuracy.",
      "Policy allows autonomous shifts up to $20k; this requires manual approval due to size.",
      "Prime Video is experiencing high bid density, reducing our win rate.",
    ],
    impact: "Projected +$8,500 ROI over the weekend flight.",
    primaryLabel: "Approve Shift",
    secondaryLabel: "Scale to $20k",
    dangerLabel: "Hold Budget",
  },
];

export const INITIAL_RESOLVED_HISTORY: ResolvedDecision[] = [
  { id: "hist-1", title: "Auto-paused Disney+ due to low win-rate (<20%)", approved: true },
  { id: "hist-2", title: "Approve Q3 Budget Expansion (+15%)", approved: true },
  { id: "hist-3", title: "Decline low-viewability banner bundle", approved: false },
];
