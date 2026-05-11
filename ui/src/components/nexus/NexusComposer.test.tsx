import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NexusComposer } from "./NexusComposer.js";

describe("<NexusComposer />", () => {
  it("does not call onSend when input is empty (edge)", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<NexusComposer onSend={onSend} />);
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(onSend).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/enter a message/i);
  });

  it("calls onSend with trimmed text (happy)", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<NexusComposer onSend={onSend} />);
    await user.type(screen.getByLabelText("Message to Nexus"), "  Hello Nexus  ");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(onSend).toHaveBeenCalledWith("Hello Nexus", "direct");
  });

  it("inserts sample bid text when Quick action is clicked (happy)", async () => {
    const user = userEvent.setup();
    render(<NexusComposer onSend={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: /quick action/i }));
    const field = screen.getByLabelText("Message to Nexus") as HTMLTextAreaElement;
    expect(field.value).toContain("YouTube CTV");
    expect(field.value).toContain("Nike 1P");
  });

  it("calls onSend with goal mode after + menu and Set goal (happy)", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<NexusComposer onSend={onSend} />);
    await user.click(screen.getByRole("button", { name: /add nexus mode/i }));
    await user.click(screen.getByRole("menuitem", { name: /set goal/i }));
    await user.type(screen.getByLabelText("Message to Nexus"), "Maximize VCR");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(onSend).toHaveBeenCalledWith("Maximize VCR", "goal");
  });

  it("calls onCancel while pending via stop control (happy)", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<NexusComposer disabled pending onCancel={onCancel} onSend={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: "Stop generation" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
