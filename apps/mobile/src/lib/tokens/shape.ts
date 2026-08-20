import { Platform } from "react-native";

export const monoFontFamily =
  Platform.select({
    ios: "Courier",
    android: "monospace",
    default: "monospace",
  }) ?? "monospace";

export const systemRadius = "rounded-r-4";
