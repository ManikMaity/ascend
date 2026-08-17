import { describe, expect, it } from "vitest";
import { healthRouter } from "./router";
import { createContext } from "../../context";

describe("healthRouter", () => {
  it("returns a healthy response", async () => {
    const caller = healthRouter.createCaller(createContext());
    const result = await caller.ping();

    expect(result.status).toBe("ok");
    expect(result.message).toContain("healthy");
    expect(result.timestamp).toBeTruthy();
  });
});
