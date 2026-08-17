import type { ReactElement } from "react";
import { vi } from "vitest";

vi.mock("@testing-library/react-native", async () => {
  const rtl = await import("@testing-library/react");
  return {
    render: (ui: ReactElement) => rtl.render(ui),
    screen: rtl.screen,
    fireEvent: rtl.fireEvent,
    waitFor: rtl.waitFor,
  };
});
