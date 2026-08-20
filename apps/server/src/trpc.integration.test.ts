import { describe, expect, it } from "vitest";
import { appRouter } from "@ascend/api";
import { createContext } from "@ascend/api";

describe("tRPC integration", () => {
  it("routes health.ping through the app router", async () => {
    const caller = appRouter.createCaller(await createContext());
    const result = await caller.health.ping();

    expect(result.status).toBe("ok");
    expect(result.message).toContain("healthy");
  });
});
