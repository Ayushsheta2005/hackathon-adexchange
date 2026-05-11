import type { YieldBuyerRow, YieldDealRow, YieldFloorRow } from "./yieldPanelTypes.js";

export const YIELD_PLACEMENT_ROWS = [
  {
    placement: "CTV Prime Time (Unskippable)",
    imps: "12.8M",
    fill: "92%",
    ecpm: "$28.40",
    revenue: "$363,520",
    vsFloor: "+12.5%",
    tone: "ok" as const,
  },
  {
    placement: "Mobile App Interstitial",
    imps: "4.5M",
    fill: "61%",
    ecpm: "$8.10",
    revenue: "$36,450",
    vsFloor: "-4.2%",
    tone: "warn" as const,
  },
  {
    placement: "Desktop Homepage Takeover",
    imps: "1.2M",
    fill: "24%",
    ecpm: "$45.00",
    revenue: "$54,000",
    vsFloor: "-22.1%",
    tone: "bad" as const,
  },
];

export const YIELD_FLOOR_ROWS: YieldFloorRow[] = [
  {
    id: "f1",
    placement: "CTV Prime Time (Unskippable)",
    floor: "$25.00",
    fillPct: "92%",
    signal: "too_low",
    hint: "Demand is extremely high. Nexus suggests raising floor to $28.00.",
  },
  {
    id: "f2",
    placement: "Desktop Homepage Takeover",
    floor: "$45.00",
    fillPct: "24%",
    signal: "too_high",
    hint: "Lower floor to $35.00 to stimulate bidding density and recover fill.",
  },
  {
    id: "f3",
    placement: "Mobile App Interstitial",
    floor: "$8.00",
    fillPct: "61%",
    signal: "calibrated",
    hint: "Floor is optimal. Maintaining balance between yield and fill.",
  },
];

export const YIELD_DEAL_ROWS: YieldDealRow[] = [
  {
    id: "d1",
    name: "HBO Max · Premium Video",
    status: "active",
    cpm: "$32.50",
    duration: "90d",
    impsPerMo: "25.0M",
    buyer: "HBO Max DSP",
  },
  {
    id: "d2",
    name: "Prime Video direct",
    status: "negotiating",
    cpm: "$28.00",
    duration: "45d",
    impsPerMo: "12.5M",
    buyer: "Prime Video 1P",
  },
  {
    id: "d3",
    name: "Netflix Exclusives (Draft)",
    status: "draft",
    cpm: "$42.00",
    duration: "14d",
    impsPerMo: "5.0M",
    buyer: "Netflix Ad Manager",
  },
];

export const YIELD_BUYER_ROWS: YieldBuyerRow[] = [
  {
    id: "b1",
    name: "HBO Max DSP",
    winsToday: "14,520",
    avgCpm: "$26.40",
    pctRevenue: "42%",
    status: "preferred",
  },
  {
    id: "b2",
    name: "Trade Desk",
    winsToday: "8,340",
    avgCpm: "$18.50",
    pctRevenue: "28%",
    status: "allowed",
  },
  {
    id: "b3",
    name: "Nike 1P",
    winsToday: "5,210",
    avgCpm: "$22.10",
    pctRevenue: "15%",
    status: "allowed",
  },
  {
    id: "b4",
    name: "Unknown Aggregator",
    winsToday: "890",
    avgCpm: "$4.20",
    pctRevenue: "2%",
    status: "blocked",
  },
];
