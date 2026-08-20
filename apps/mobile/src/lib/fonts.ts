import { useFonts } from "expo-font";

export const barlowFonts = {
  Barlow_400Regular: require("../../assets/fonts/Barlow_400Regular.ttf"),
  Barlow_500Medium: require("../../assets/fonts/Barlow_500Medium.ttf"),
  Barlow_700Bold: require("../../assets/fonts/Barlow_700Bold.ttf"),
} as const;

export function useBarlowFonts() {
  return useFonts(barlowFonts);
}
