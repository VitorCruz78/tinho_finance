import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#FAF9F6",
        secondaryColor: "#FFF9E3",
        primaryText: "#333333",
        secondaryText: "#666666",
      },
    },
  },
  plugins: [],
} satisfies Config
