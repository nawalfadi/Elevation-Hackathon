import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./frontend/**/*.{ts,tsx}",
    "./backend/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F6F3",
        surface: "#FFFFFF",
        line: "#E8E6E1",
        ink: {
          DEFAULT: "#1A1A18",
          muted: "#6B6963",
          faint: "#9A9892",
        },
        accent: {
          DEFAULT: "#3D4F46",
          hover: "#32423B",
          soft: "#E7EDE9",
        },
        forest: {
          DEFAULT: "#3E5C4A",
          soft: "#E6F0EA",
        },
        terracotta: {
          DEFAULT: "#A85A44",
          soft: "#F6E8E3",
        },
        amber: {
          DEFAULT: "#8A6A32",
          soft: "#F4EEDC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-arabic)", "ui-sans-serif", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 8px 24px rgba(26, 26, 24, 0.06)",
        lift: "0 12px 32px rgba(26, 26, 24, 0.08)",
      },
      borderRadius: {
        card: "16px",
        control: "12px",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
