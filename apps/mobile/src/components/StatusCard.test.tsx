import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react-native";
import { StatusCard } from "./StatusCard";

describe("StatusCard", () => {
  it("renders completed state", () => {
    render(<StatusCard state="completed" label="Completed" />);
    expect(screen.getByText("COMPLETED")).toBeTruthy();
  });

  it("renders missed state", () => {
    render(<StatusCard state="missed" label="Missed" />);
    expect(screen.getByText("MISSED")).toBeTruthy();
  });

  it("renders waiting state", () => {
    render(<StatusCard state="waiting" label="Waiting" />);
    expect(screen.getByText("WAITING")).toBeTruthy();
  });
});
