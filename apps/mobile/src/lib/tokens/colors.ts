export const primary = {
  50: "#E8F2FF",
  100: "#C5DEFF",
  200: "#3D8FFF",
  500: "#1A7AFF",
  700: "#0F5FCC",
  800: "#0A4AA3",
  900: "#063675",
  950: "#031F45",
} as const;

export const neutral = {
  0: "#FEFFF9",
  300: "#C7C7C7",
  500: "#616161",
  650: "#525252",
  950: "#1D1E1A",
} as const;

export const error = {
  500: "#F95D25",
  800: "#BD261B",
} as const;

export const canvas = "#1D1E1A";
export const surface = "#272727";
export const surfaceRaised = "#323232";
export const borderSubtle = "rgba(255,255,255,0.08)";

export const semantic = {
  button: {
    active: { bg: neutral[0], text: "#000000" },
    stroke: { border: neutral[0], text: neutral[0] },
    disabled: { bg: neutral[500], text: neutral[500] },
    error: { bg: error[500], text: neutral[950] },
  },
  card: {
    bg: surface,
    title: neutral[0],
    subtitle: neutral[300],
  },
  input: {
    bg: surface,
    text: neutral[0],
    placeholder: neutral[500],
    focusBorder: primary[500],
  },
  progress: {
    track: surfaceRaised,
    fill: primary[500],
  },
  status: {
    completed: primary[500],
    missed: error[500],
    waiting: neutral[500],
  },
} as const;

export const colors = {
  primary,
  neutral,
  error,
  canvas,
  surface,
  surfaceRaised,
  borderSubtle,
  semantic,
} as const;
