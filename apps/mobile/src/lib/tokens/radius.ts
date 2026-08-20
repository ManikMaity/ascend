export const radius = {
  "r-4": 4,
  "r-8": 8,
  "r-16": 16,
  "r-20": 20,
  "r-24": 24,
  "r-full": 9999,
} as const;

export type RadiusToken = keyof typeof radius;
