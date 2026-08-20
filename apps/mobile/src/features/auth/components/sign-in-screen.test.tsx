import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { SignInScreen } from "./sign-in-screen";

vi.mock("./hero-background", () => ({
  HeroBackground: () => null,
}));

vi.mock("./google-sign-in-button", () => ({
  GoogleSignInButton: ({
    onPress,
    isLoading,
  }: {
    onPress: () => void;
    isLoading?: boolean;
  }) => (
    <button type="button" onClick={onPress} disabled={isLoading}>
      Continue with Google
    </button>
  ),
}));

vi.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

vi.mock("expo-image", () => ({
  Image: () => null,
}));

vi.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children }: { children?: React.ReactNode }) => children ?? null,
}));

vi.mock("expo-router", () => ({
  router: {
    replace: vi.fn(),
  },
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      social: vi.fn().mockResolvedValue({}),
    },
    getSession: vi.fn().mockResolvedValue({}),
  },
}));

describe("SignInScreen", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders only the Google sign-in button", () => {
    render(<SignInScreen />);

    expect(screen.getByText("Continue with Google")).toBeTruthy();
    expect(screen.queryByText("SYSTEM")).toBeNull();
    expect(screen.queryByText(/REGISTER AS PLAYER/i)).toBeNull();
  });

  it("calls Google sign-in when the button is pressed", async () => {
    const { authClient } = await import("@/lib/auth-client");

    render(<SignInScreen />);
    fireEvent.press(screen.getByText("Continue with Google"));

    expect(authClient.signIn.social).toHaveBeenCalledWith({
      provider: "google",
      callbackURL: "ascend://",
    });
  });
});
