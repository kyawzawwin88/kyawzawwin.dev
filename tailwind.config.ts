import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "Inter", "sans-serif"],
        mono: ["Geist Mono", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      colors: {
        bg: "#FAFAF8",
        ink: "#111111",
        muted: "#666666",
        line: "#E5E5E5",
        surface: "#FFFFFF",
        accent: "#FF5A36",
      },
      maxWidth: {
        page: "1120px",
      },
      borderRadius: {
        notebook: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
