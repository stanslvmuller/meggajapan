import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#090909",
        "ink-soft": "#232323",
        red: {
          DEFAULT: "#f71f2d",
          hot: "#fd0025",
          dark: "#e41d2b",
        },
        cyan: {
          DEFAULT: "#2ad7f9",
          soft: "#95ebfc",
        },
        line: "#e2e2e2",
        "line-soft": "#efefef",
        panel: "#f7f7f7",
        "grey-dark": "#363636",
        "grey-mid": "#636464",
      },
      fontFamily: {
        sans: ["var(--font-noto)", "Noto Sans", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-luckiest)", "Luckiest Guy", "Impact", "sans-serif"],
      },
      maxWidth: {
        shell: "1440px",
      },
      boxShadow: {
        card: "2px 2px 8px 0 rgba(0,0,0,0.2)",
        "card-hover": "2px 4px 14px 0 rgba(0,0,0,0.28)",
        soft: "0 1px 3px 0 rgba(0,0,0,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
