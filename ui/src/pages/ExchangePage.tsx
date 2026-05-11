import type { AdInventoryListing } from "@ade/shared";
import type { JSX } from "react";
import { useEffect, useState } from "react";

import { postInventory, runAuction, triggerAgentDemo } from "../api/client.js";
import { AppNav } from "../components/AppNav.js";
import { AuctionFeed } from "../components/AuctionFeed.js";
import { AuctionPanel } from "../components/AuctionPanel.js";
import { BuyerPanel } from "../components/BuyerPanel.js";
import { MarginExplainer } from "../components/MarginExplainer.js";
import { PauseButton } from "../components/PauseButton.js";
import { SellerPanel } from "../components/SellerPanel.js";
import { SettlementLedger } from "../components/SettlementLedger.js";
import { TransactionCounter } from "../components/TransactionCounter.js";
import { useDashboardData } from "../context/DashboardDataContext.js";
import { uiEnv } from "../env.js";

export function ExchangePage(): JSX.Element {
  const {
    connected,
    settlementCount,
    auctions,
    lastAuction,
    lastReceipt,
    confirmedReceipts,
    listings,
    refreshInventory,
    bids,
    refreshBids,
    control,
  } = useDashboardData();

  const [registering, setRegistering] = useState(false);
  const [running, setRunning] = useState(false);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [activeListingId, setActiveListingId] = useState<string | null>(null);
  const [cycleAuctionId, setCycleAuctionId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeListingId && listings.length > 0) {
      setActiveListingId(listings[0]?.listingId ?? null);
    }
  }, [listings, activeListingId]);

  useEffect(() => {
    if (lastAuction) setCycleAuctionId(lastAuction.auctionId);
  }, [lastAuction?.auctionId]);

  useEffect(() => {
    if (
      lastReceipt?.status === "confirmed" &&
      cycleAuctionId !== null &&
      lastReceipt.auctionId === cycleAuctionId
    ) {
      const t = window.setTimeout(() => setCycleAuctionId(null), 2500);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [lastReceipt?.receiptId, lastReceipt?.status, lastReceipt?.auctionId, cycleAuctionId]);

  const activeListing = listings.find((l) => l.listingId === activeListingId) ?? null;

  async function handleRegisterListing(): Promise<void> {
    const sellerWallet = uiEnv.VITE_SELLER_WALLET_ADDRESS;
    if (!sellerWallet) return;
    setRegistering(true);
    try {
      const listing: AdInventoryListing = {
        listingId: crypto.randomUUID(),
        sellerAgentId: "seller-agent-sigma",
        sellerWallet,
        adType: "display",
        format: "banner",
        size: "300x250",
        contextualExclusions: [],
        floorPriceUsdc: "0.002",
        createdAt: new Date().toISOString(),
      };
      await postInventory(listing);
      await refreshInventory();
    } catch (err) {
      console.error("Register listing failed:", err);
    } finally {
      setRegistering(false);
    }
  }

  async function handleRunAgentAuction(): Promise<void> {
    setAgentRunning(true);
    setAgentError(null);
    try {
      // Auto-register a listing if inventory is empty so the user doesn't need to click Step 1 first.
      if (listings.length === 0) {
        await handleRegisterListing();
      }
      await triggerAgentDemo();
      await refreshBids();
      await refreshInventory();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("503")) setAgentError("Agent demo not configured — set GEMINI_API_KEY in .env.local");
      else if (msg.includes("422")) setAgentError("No inventory — register an ad slot first");
      else if (msg.includes("500")) setAgentError("Server error — check terminal logs for details");
      else setAgentError(msg);
    } finally {
      setAgentRunning(false);
    }
  }

  async function handleRunAuction(): Promise<void> {
    if (!activeListingId) return;
    setRunning(true);
    setCycleAuctionId(null);
    try {
      await runAuction(activeListingId);
      await refreshBids();
      // The server removes the listing after a confirmed settlement.
      // Refresh inventory so the panel reflects the new state.
      await refreshInventory();
    } catch (err) {
      console.error("Run auction failed:", err);
    } finally {
      setRunning(false);
    }
  }

  const cycleActive = cycleAuctionId !== null;
  const step2Done = cycleActive && (bids.length > 0 || lastAuction != null);
  const step3Done = cycleActive && lastAuction != null;
  const step4Done = cycleActive && lastReceipt?.status === "confirmed";

  return (
    <div className="exchange-bg-mesh min-h-screen text-slate-100">
      <main className="mx-auto max-w-7xl p-6">
        <AppNav />

        {/* ── Hero Header ───────────────────────────────────────── */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="bg-gradient-to-r from-exchange-accent via-cyan-300 to-exchange-accent-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                DEMO exchange
              </h1>
              <span className="hidden rounded-full border border-exchange-accent/30 bg-exchange-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-exchange-accent sm:inline-flex">
                Live
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              AI agents buy &amp; sell ad impressions · settled via{" "}
              <span className="text-exchange-accent">Circle Arc nanopayments</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PauseButton
              paused={control.paused}
              pending={control.pending}
              onPause={() => void control.pause()}
              onResume={() => void control.resume()}
            />
            {/* Live status dot */}
            <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3 py-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  connected
                    ? "animate-status-dot bg-exchange-success shadow-glow-green"
                    : "bg-slate-600"
                }`}
              />
              <span
                aria-label="Exchange connection status"
                className={`font-mono text-[11px] font-semibold uppercase tracking-widest ${
                  connected ? "text-exchange-success" : "text-slate-600"
                }`}
              >
                {connected ? "live" : "connecting…"}
              </span>
            </div>
          </div>
        </header>

        {/* ── Paused Banner ─────────────────────────────────────── */}
        {control.paused && (
          <div
            role="status"
            className="mb-6 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/8 px-4 py-3 text-sm text-amber-300"
          >
            <span className="text-lg">⏸</span>
            <span>
              Demo paused — buyer agents, seller agent, and auto-clear are halted.{" "}
              <span className="font-semibold">Click Resume to continue.</span>
            </span>
          </div>
        )}

        {/* ── Lifecycle Flow Tracker ─────────────────────────────── */}
        <div className="glass-card mb-6 flex items-center gap-0 overflow-x-auto rounded-2xl px-5 py-4">
          <FlowStep n={1} label="Seller lists" sublabel="Ad inventory registered" done={listings.length > 0} />
          <FlowConnector done={listings.length > 0 && step2Done} />
          <FlowStep n={2} label="Buyers bid" sublabel="Agents submit sealed bids" done={step2Done} />
          <FlowConnector done={step2Done && step3Done} />
          <FlowStep n={3} label="Auction clears" sublabel="Second-price winner selected" done={step3Done} />
          <FlowConnector done={step3Done && step4Done} />
          <FlowStep n={4} label="Ad goes live" sublabel="Circle Arc payment confirmed" done={step4Done} />
        </div>

        {/* ── Main 3-Column Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <SellerPanel
            listings={listings}
            onRegister={handleRegisterListing}
            registering={registering}
            disabledReason={
              uiEnv.VITE_SELLER_WALLET_ADDRESS
                ? null
                : "Set VITE_SELLER_WALLET_ADDRESS to enable manual registration"
            }
          />
          <BuyerPanel
            bids={bids}
            lastAuction={lastAuction}
            lastReceipt={lastReceipt}
            activeListing={activeListing}
            onRunAgentAuction={handleRunAgentAuction}
            agentRunning={agentRunning}
            agentError={agentError}
          />
          <AuctionPanel
            listings={listings}
            activeListingId={activeListingId}
            onSelectListing={setActiveListingId}
            onRunAuction={handleRunAuction}
            running={running}
            lastAuction={lastAuction}
            lastReceipt={lastReceipt}
          />
        </div>

        {/* ── Live Data Row ──────────────────────────────────────── */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <AuctionFeed auctions={auctions} />
          <TransactionCounter count={settlementCount} />
          <SettlementLedger
            receipts={confirmedReceipts}
            sellerAddress={uiEnv.VITE_SELLER_WALLET_ADDRESS}
          />
        </div>

        {/* ── Payment Rail Explainer ─────────────────────────────── */}
        <div className="mt-5">
          <MarginExplainer />
        </div>

        {/* ── Footer ────────────────────────────────────────────── */}
        <footer className="mt-8 border-t border-white/5 pt-5 text-center">
          <p className="font-mono text-[11px] text-slate-700">
            Agentic Ad Exchange · HackPulse 2026 · Powered by{" "}
            <span className="text-exchange-accent">Circle Arc</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

/* ── Flow Step Component ──────────────────────────────────────── */
function FlowStep({
  n,
  label,
  sublabel,
  done,
}: {
  n: number;
  label: string;
  sublabel: string;
  done: boolean;
}): JSX.Element {
  return (
    <div className={`flex shrink-0 flex-col items-center gap-2 px-3 text-center transition-all duration-500 ${done ? "opacity-100" : "opacity-40"}`}>
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
          done
            ? "bg-exchange-accent text-exchange-bg shadow-glow-cyan"
            : "border border-white/10 bg-white/5 text-slate-500"
        }`}
      >
        {done ? "✓" : n}
      </div>
      <div>
        <p className={`whitespace-nowrap text-xs font-semibold ${done ? "text-exchange-accent" : "text-slate-400"}`}>
          {label}
        </p>
        <p className="mt-0.5 whitespace-nowrap text-[10px] text-slate-600">{sublabel}</p>
      </div>
    </div>
  );
}

function FlowConnector({ done }: { done: boolean }): JSX.Element {
  return (
    <div className="relative mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-white/6">
      <div
        className={`absolute inset-y-0 left-0 rounded-full bg-exchange-accent transition-all duration-700 ${done ? "w-full shadow-glow-cyan-sm" : "w-0"}`}
      />
    </div>
  );
}
