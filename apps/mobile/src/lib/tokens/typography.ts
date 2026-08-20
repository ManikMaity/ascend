export const fontFamily = {
  regular: "Barlow_400Regular",
  medium: "Barlow_500Medium",
  bold: "Barlow_700Bold",
} as const;

export const typography = {
  "headline-1": { fontSize: 32, lineHeight: 40, fontFamily: fontFamily.bold },
  "headline-2": { fontSize: 24, lineHeight: 32, fontFamily: fontFamily.bold },
  title: { fontSize: 18, lineHeight: 26, fontFamily: fontFamily.medium },
  "body-1": { fontSize: 16, lineHeight: 24, fontFamily: fontFamily.regular },
  "body-2": { fontSize: 14, lineHeight: 20, fontFamily: fontFamily.regular },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: fontFamily.medium },
  metric: { fontSize: 24, lineHeight: 32, fontFamily: fontFamily.bold },
} as const;

export type TextVariant = keyof typeof typography;
