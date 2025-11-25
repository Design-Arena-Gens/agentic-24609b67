import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#0b0614",
        mist: "#6b5aa1",
        ember: "#c77dff"
      },
      fontFamily: {
        noir: ["'IBM Plex Sans'", "system-ui", "sans-serif"]
      },
      animation: {
        "fog-swirl": "fog 18s ease-in-out infinite",
        "fog-sway": "fog 28s ease-in-out infinite reverse",
        "pulse-cut": "cut 0.9s steps(2) infinite",
        shimmer: "shimmer 10s ease-in-out infinite",
        erase: "erase 5s ease-in-out forwards"
      },
      keyframes: {
        fog: {
          "0%": { transform: "translate3d(-10%, -5%, 0) scale(1.05)", opacity: "0.35" },
          "50%": { transform: "translate3d(12%, 8%, 0) scale(1.2)", opacity: "0.6" },
          "100%": { transform: "translate3d(-8%, -6%, 0) scale(1.1)", opacity: "0.4" }
        },
        cut: {
          "0%": { opacity: "0" },
          "30%": { opacity: "1" },
          "60%": { opacity: "0.3" },
          "100%": { opacity: "0" }
        },
        shimmer: {
          "0%": { opacity: "0.35" },
          "30%": { opacity: "0.6" },
          "60%": { opacity: "0.2" },
          "100%": { opacity: "0.35" }
        },
        erase: {
          "0%": { backgroundPosition: "0% 50%" },
          "60%": { backgroundPosition: "100% 50%" },
          "100%": { color: "transparent" }
        }
      }
    }
  },
  plugins: []
};

export default config;
