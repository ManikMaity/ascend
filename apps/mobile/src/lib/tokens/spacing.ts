export const spacing = {
  "s-0": 0,
  "s-4": 4,
  "s-8": 8,
  "s-12": 12,
  "s-16": 16,
  "s-20": 20,
  "s-24": 24,
  "s-32": 32,
  "s-40": 40,
  "s-48": 48,
  "s-56": 56,
  "s-64": 64,
} as const;

export type SpacingToken = keyof typeof spacing;
