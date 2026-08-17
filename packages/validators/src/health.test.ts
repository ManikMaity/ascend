import { describe, expect, it } from "vitest";
import { healthResponseSchema } from "./health";

describe("healthResponseSchema", () => {
  it("validates a health response", () => {
    const result = healthResponseSchema.parse({
      status: "ok",
      message: "hello",
      timestamp: new Date().toISOString(),
    });

    expect(result.status).toBe("ok");
    expect(result.message).toBe("hello");
  });
});
