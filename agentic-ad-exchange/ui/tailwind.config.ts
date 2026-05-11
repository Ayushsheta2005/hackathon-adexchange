import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        atlas: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        "atlas-mono": ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        exchange: {
          bg: "#060810",
          card: "#0d1117",
          "card-2": "#111827",
          accent: "#00e5ff",
          "accent-2": "#7c3aed",
          warn: "#ff4466",
          success: "#00ff9d",
          rose: "#fb7185",
          emerald: "#34d399",
          amber: "#fbbf24",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px 2px rgba(0, 229, 255, 0.3)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 20px 4px rgba(0, 229, 255, 0.6)" },
        },
        "status-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        "bid-slide-in": {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "ticker-count": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0,229,255,0.3)" },
          "50%": { borderColor: "rgba(0,229,255,0.8)" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "status-dot": "status-dot 2s ease-in-out infinite",
        "bid-slide-in": "bid-slide-in 0.25s ease-out both",
        "ticker-count": "ticker-count 0.3s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        shimmer: "shimmer 3s linear infinite",
        "border-glow": "border-glow 2.5s ease-in-out infinite",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px 4px rgba(0, 229, 255, 0.25)",
        "glow-cyan-sm": "0 0 10px 2px rgba(0, 229, 255, 0.2)",
        "glow-purple": "0 0 20px 4px rgba(124, 58, 237, 0.3)",
        "glow-green": "0 0 20px 4px rgba(0, 255, 157, 0.25)",
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
