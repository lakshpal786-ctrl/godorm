import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#fff5f1",
          100: "#ffe5dc",
          500: "#ff6f61",
          600: "#f25f52",
          700: "#d44c41"
        }
      }
    }
  },
  plugins: []
};

export default config;
