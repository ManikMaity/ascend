import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react-native";
import { Text } from "./Text";

describe("Text", () => {
  it("renders body-1 by default", () => {
    render(<Text>Quest complete. XP allocated.</Text>);
    expect(screen.getByText("Quest complete. XP allocated.")).toBeTruthy();
  });

  it("renders headline-1", () => {
    render(<Text variant="headline-1">Hunter dashboard</Text>);
    expect(screen.getByText("Hunter dashboard")).toBeTruthy();
  });

  it("renders headline-2", () => {
    render(<Text variant="headline-2">Training protocol</Text>);
    expect(screen.getByText("Training protocol")).toBeTruthy();
  });

  it("renders title", () => {
    render(<Text variant="title">Full body blast</Text>);
    expect(screen.getByText("Full body blast")).toBeTruthy();
  });

  it("renders metric", () => {
    render(<Text variant="metric">12,450</Text>);
    expect(screen.getByText("12,450")).toBeTruthy();
  });

  it("renders muted text", () => {
    render(
      <Text variant="body-1" muted>
        Secondary copy
      </Text>,
    );
    expect(screen.getByText("Secondary copy")).toBeTruthy();
  });
});
