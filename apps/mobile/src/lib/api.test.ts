import { describe, expect, it, vi } from "vitest";

const mockConstants = {
  expoConfig: { hostUri: "192.168.1.42:8081" } as { hostUri?: string },
  expoGoConfig: undefined as { debuggerHost?: string } | undefined,
};

vi.mock("expo-constants", () => ({
  default: mockConstants,
}));

vi.mock("react-native", () => ({
  Platform: { OS: "android" },
}));

describe("getApiUrl", () => {
  it("rewrites localhost to dev machine LAN IP on native", async () => {
    vi.stubEnv("EXPO_PUBLIC_API_URL", "http://localhost:3001");
    vi.resetModules();
    const { getApiUrl } = await import("./api");
    expect(getApiUrl()).toBe("http://192.168.1.42:3001");
    vi.unstubAllEnvs();
  });

  it("keeps custom port when rewriting localhost", async () => {
    vi.stubEnv("EXPO_PUBLIC_API_URL", "http://localhost:3456");
    vi.resetModules();
    const { getApiUrl } = await import("./api");
    expect(getApiUrl()).toBe("http://192.168.1.42:3456");
    vi.unstubAllEnvs();
  });

  it("falls back to dev host when env is unset", async () => {
    vi.stubEnv("EXPO_PUBLIC_API_URL", "");
    vi.resetModules();
    const { getApiUrl } = await import("./api");
    expect(getApiUrl()).toBe("http://192.168.1.42:3001");
    vi.unstubAllEnvs();
  });
});
