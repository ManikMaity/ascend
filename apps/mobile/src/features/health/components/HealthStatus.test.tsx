import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react-native";
import { useHealthQuery } from "../hooks/useHealthQuery";
import { HealthStatus } from "./HealthStatus";

vi.mock("../hooks/useHealthQuery", () => ({
  useHealthQuery: vi.fn(),
}));

const mockUseHealthQuery = vi.mocked(useHealthQuery);

describe("HealthStatus", () => {
  it("shows loading state", () => {
    mockUseHealthQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as ReturnType<typeof useHealthQuery>);

    render(<HealthStatus />);
    expect(screen.getByText("Checking API health...")).toBeTruthy();
  });

  it("shows healthy response", () => {
    mockUseHealthQuery.mockReturnValue({
      data: {
        status: "ok",
        message: "Ascend API is healthy",
        timestamp: new Date().toISOString(),
      },
      isLoading: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useHealthQuery>);

    render(<HealthStatus />);
    expect(screen.getByText("Ascend API is healthy")).toBeTruthy();
    expect(screen.getByText("Status: ok")).toBeTruthy();
  });

  it("shows error state", () => {
    mockUseHealthQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "Network request failed" },
    } as unknown as ReturnType<typeof useHealthQuery>);

    render(<HealthStatus />);
    expect(screen.getByText("API unreachable")).toBeTruthy();
    expect(screen.getByText("Network request failed")).toBeTruthy();
  });
});
