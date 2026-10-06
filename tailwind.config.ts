import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 👈 Yeh poore src folder ki har file ko scan karega
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;