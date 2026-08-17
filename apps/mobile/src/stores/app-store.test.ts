import { describe, expect, it } from "vitest";
import { useAppStore } from "./app-store";

describe("useAppStore", () => {
  it("updates ready state", () => {
    useAppStore.setState({ ready: false });
    useAppStore.getState().setReady(true);
    expect(useAppStore.getState().ready).toBe(true);
  });
});
