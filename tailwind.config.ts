import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: { full: "100%" },
      width: {
        full: "100%",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      backgroundColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      borderColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
    },
  },
  plugins: [
    nextui({
      layout: {
        disabledOpacity: "0.7",
      },
      themes: {
        light: {
          colors: {
            background: "#ffffff", // Sets default background to white
            default: "#ffffff", // Sets default component background
          },
        },

        dark: {
          colors: {
            background: "#1a1a1a", // Optional: customize dark mode background
            default: "#333333", // Dark mode component background (optional)
          },
        },
      },
    }),
  ],
} satisfies Config;
