import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: ".5rem",
        },
      },
      colors: {
        primaryBg: "#E4F7F8",
        primaryText: "#008f94",
      },
    },
  },
  plugins: [nextui()]
} satisfies Config;



