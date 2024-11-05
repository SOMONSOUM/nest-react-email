import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/email/templates/**/*.{js,ts,jsx,tsx}",
    "./src/email/layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
