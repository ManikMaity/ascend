/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#1D1E1A",
        surface: {
          DEFAULT: "#272727",
          raised: "#323232",
        },
        primary: {
          50: "#E8F2FF",
          100: "#C5DEFF",
          200: "#3D8FFF",
          500: "#1A7AFF",
          700: "#0F5FCC",
          800: "#0A4AA3",
          900: "#063675",
          950: "#031F45",
        },
        neutral: {
          0: "#FEFFF9",
          300: "#C7C7C7",
          500: "#616161",
          650: "#525252",
          950: "#1D1E1A",
        },
        error: {
          500: "#F95D25",
          800: "#BD261B",
        },
        "border-subtle": "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        barlow: ["Barlow_400Regular"],
        "barlow-medium": ["Barlow_500Medium"],
        "barlow-bold": ["Barlow_700Bold"],
      },
      fontSize: {
        "headline-1": ["32px", { lineHeight: "40px" }],
        "headline-2": ["24px", { lineHeight: "32px" }],
        title: ["18px", { lineHeight: "26px" }],
        "body-1": ["16px", { lineHeight: "24px" }],
        "body-2": ["14px", { lineHeight: "20px" }],
        caption: ["12px", { lineHeight: "16px" }],
        metric: ["24px", { lineHeight: "32px" }],
      },
      spacing: {
        "s-0": "0px",
        "s-4": "4px",
        "s-8": "8px",
        "s-12": "12px",
        "s-16": "16px",
        "s-20": "20px",
        "s-24": "24px",
        "s-32": "32px",
        "s-40": "40px",
        "s-48": "48px",
        "s-56": "56px",
        "s-64": "64px",
      },
      borderRadius: {
        "r-4": "4px",
        "r-8": "8px",
        "r-16": "16px",
        "r-20": "20px",
        "r-24": "24px",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
      },
    },
  },
  plugins: [],
};
