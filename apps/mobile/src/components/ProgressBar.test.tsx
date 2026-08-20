import { describe, expect, it } from "vitest";
import { clampProgress } from "./ProgressBar";

describe("ProgressBar", () => {
  it("clamps values below 0 to 0", () => {
    expect(clampProgress(-10)).toBe(0);
  });

  it("clamps values above 100 to 100", () => {
    expect(clampProgress(150)).toBe(100);
  });

  it("passes through valid values", () => {
    expect(clampProgress(60)).toBe(60);
  });
});
