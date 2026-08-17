import { describe, expect, it } from "vitest";
import { appRouter } from "@ascend/api";
import { createContext } from "@ascend/api";

describe("server health", () => {
  it("exposes a health ping procedure", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.health.ping();

    expect(result.status).toBe("ok");
  });
});
