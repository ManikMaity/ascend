import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Button } from "./Button";

describe("Button", () => {
  it("renders active variant", () => {
    render(<Button variant="active">Begin training</Button>);
    expect(screen.getByText("Begin training")).toBeTruthy();
  });

  it("renders stroke variant", () => {
    render(<Button variant="stroke">View stats</Button>);
    expect(screen.getByText("View stats")).toBeTruthy();
  });

  it("renders error variant", () => {
    render(<Button variant="error">Abandon quest</Button>);
    expect(screen.getByText("Abandon quest")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Begin training</Button>);
    fireEvent.press(screen.getByText("Begin training"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = vi.fn();
    render(
      <Button disabled onPress={onPress}>
        Begin training
      </Button>,
    );
    fireEvent.press(screen.getByText("Begin training"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
