import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light "Apple" palette — soft gray canvas, near-black ink, hairline lines.
        canvas: "#f4f4f6", // page background
        surface: "#ffffff", // solid card surface
        ink: "#1d1d1f", // primary text (Apple near-black)
        slate: "#6e6e73", // secondary text
        line: "#d9d9e0", // hairline borders / dividers
        brand: "#0a84ff", // primary blue accent
        grape: "#6d5bd0", // secondary purple
        mint: "#1eb6a0", // teal pop (nods to the old accent)
        amber: "#f5a623",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        glass: "0 1px 1px rgba(0,0,0,0.02), 0 8px 24px -12px rgba(20,20,40,0.18)",
        "glass-lg": "0 1px 1px rgba(0,0,0,0.03), 0 24px 60px -20px rgba(20,20,40,0.28)",
        float: "0 10px 30px -12px rgba(20,20,40,0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "aurora-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(6%, 8%) scale(1.12)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-7%, -5%) scale(1.08)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(5%, -8%) scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "aurora-1": "aurora-1 18s ease-in-out infinite",
        "aurora-2": "aurora-2 22s ease-in-out infinite",
        "aurora-3": "aurora-3 26s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
