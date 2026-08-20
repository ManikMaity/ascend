import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react-native";
import { SurfaceCard } from "./SurfaceCard";
import { Text } from "./Text";

describe("SurfaceCard", () => {
  it("renders children", () => {
    render(
      <SurfaceCard>
        <Text>Quest complete. XP allocated.</Text>
      </SurfaceCard>,
    );
    expect(screen.getByText("Quest complete. XP allocated.")).toBeTruthy();
  });

  it("renders optional chip label", () => {
    render(
      <SurfaceCard chipLabel="Daily quest">
        <Text>Complete 3 training sessions.</Text>
      </SurfaceCard>,
    );
    expect(screen.getByText("DAILY QUEST")).toBeTruthy();
    expect(screen.getByText("Complete 3 training sessions.")).toBeTruthy();
  });
});
