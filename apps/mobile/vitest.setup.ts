import type { ReactElement } from "react";
import { afterEach, vi } from "vitest";

vi.mock("react-native-svg", () => ({
  default: ({ children }: { children?: ReactElement }) => children ?? null,
  Svg: ({ children }: { children?: ReactElement }) => children ?? null,
  Circle: () => null,
}));

vi.mock("@testing-library/react-native", async () => {
  const rtl = await import("@testing-library/react");
  return {
    render: (ui: ReactElement) => rtl.render(ui),
    screen: rtl.screen,
    fireEvent: {
      ...rtl.fireEvent,
      press: (element: Element) => rtl.fireEvent.click(element),
    },
    waitFor: rtl.waitFor,
    cleanup: rtl.cleanup,
  };
});

afterEach(async () => {
  const rtl = await import("@testing-library/react");
  rtl.cleanup();
});
