import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#0C0C0C", graphite: "#292929", accent: "#FF3D00", mute: "#8C8C8C" },
    fontFamily: { display: ["var(--font-display)", "serif"], body: ["var(--font-body)", "sans-serif"], playfair: ["var(--font-playfair)", "serif"], grotesk: ["var(--font-grotesk)", "sans-serif"], bebas: ["var(--font-bebas)", "sans-serif"], open: ["var(--font-open)", "sans-serif"] },
  } },
  plugins: [],
};
export default config;
