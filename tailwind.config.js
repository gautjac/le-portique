/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Le Portique — the painted porch. Warm marble, ink, a single oxblood/bronze accent.
        marble: {
          DEFAULT: "#ece4d6", // warm stone
          light: "#f5efe4",
          pale: "#faf6ee",
          dim: "#e0d6c4",
          shade: "#d4c8b2",
          vein: "#c7b9a0",
        },
        ink: {
          DEFAULT: "#2a2620", // near-black warm ink
          soft: "#574e42",
          faint: "#8a7f6e",
        },
        oxblood: {
          DEFAULT: "#9a3b2e", // the single accent
          deep: "#7c2b22",
          soft: "#b6594a",
        },
        bronze: {
          DEFAULT: "#9c6b34",
          soft: "#b88a52",
          pale: "#d8b888",
        },
      },
      fontFamily: {
        // serif with gravitas (display), reading serif, clean sans, mono for attributions
        display: ['"Cormorant"', "Georgia", "serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Public Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        stone: "0 1px 2px rgba(42,38,32,0.06), 0 8px 24px -12px rgba(42,38,32,0.18)",
        "stone-lg": "0 2px 4px rgba(42,38,32,0.06), 0 18px 44px -18px rgba(42,38,32,0.28)",
        carved: "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 2px rgba(42,38,32,0.08)",
      },
      backgroundImage: {
        // subtle column / fluting motif
        flute:
          "repeating-linear-gradient(90deg, transparent 0, transparent 22px, rgba(42,38,32,0.035) 22px, rgba(42,38,32,0.035) 23px)",
      },
      keyframes: {
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        riseIn: "riseIn 0.5s ease-out both",
        fadeIn: "fadeIn 0.6s ease-out both",
        breathe: "breathe 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
