import { describe, expect, it } from "vitest";

import { getSimulatedNexusReply } from "./nexusComposerSimulation.js";

describe("getSimulatedNexusReply", () => {
  it("returns goal copy regardless of text (happy)", () => {
    expect(getSimulatedNexusReply("goal", "anything")).toMatch(/Campaign objective updated/i);
  });

  it("returns policy copy regardless of text (happy)", () => {
    expect(getSimulatedNexusReply("policy", "")).toMatch(/Policy saved/i);
  });

  it("matches bid/CPM keywords in direct mode (happy)", () => {
    expect(getSimulatedNexusReply("direct", "Raise my CPM")).toMatch(/YouTube CTV/i);
    expect(getSimulatedNexusReply("direct", "place a bid")).toMatch(/Nike 1P/i);
  });

  it("matches pause in direct mode (edge)", () => {
    expect(getSimulatedNexusReply("direct", "Please pause")).toMatch(/Pausing that supply path/i);
  });

  it("does not match bid inside forbidden (edge)", () => {
    expect(getSimulatedNexusReply("direct", "forbidden topic")).toBe(
      "Understood. Processing that instruction now.",
    );
  });

  it("returns default direct reply when no keyword (edge)", () => {
    expect(getSimulatedNexusReply("direct", "hello")).toBe(
      "Understood. Processing that instruction now.",
    );
  });
});
