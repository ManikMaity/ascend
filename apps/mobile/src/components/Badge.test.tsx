import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react-native";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders label text", () => {
    render(<Badge label="S" />);
    expect(screen.getByText("S")).toBeTruthy();
  });
});
