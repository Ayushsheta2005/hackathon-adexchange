import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NexusRightPanel } from "./NexusRightPanel.js";

function mockControl() {
  return {
    paused: false,
    pending: false,
    pause: vi.fn().mockResolvedValue(undefined),
    resume: vi.fn().mockResolvedValue(undefined),
  };
}

function renderPanel() {
  return render(
    <NexusRightPanel
      connected
      paused={false}
      settlementCount={0}
      bidCount={0}
      listingCount={0}
      lastAuction={null}
      lastReceipt={null}
      control={mockControl()}
    />,
  );
}

describe("<NexusRightPanel />", () => {
  it("defaults to Monitor with calm empty state when there are no exceptions (happy)", () => {
    renderPanel();
    expect(screen.getByRole("heading", { name: /nexus workspace/i })).toBeInTheDocument();
    expect(screen.getByText(/nexus is operating within policy/i)).toBeInTheDocument();
  });

  it("shows Review tab badge matching pending decision count (edge)", () => {
    renderPanel();
    const reviewTab = screen.getByRole("tab", { name: /review/i });
    expect(within(reviewTab).getByText("2")).toBeInTheDocument();
  });

  it("switches to Create and shows step 1 objective flow (happy)", async () => {
    const user = userEvent.setup();
    renderPanel();
    await user.click(screen.getByRole("tab", { name: /^create$/i }));
    expect(screen.getByPlaceholderText(/tell nexus what you want to achieve/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next: inventory/i })).toBeInTheDocument();
  });
});
