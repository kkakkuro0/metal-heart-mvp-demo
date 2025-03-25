/** @type {import('@tailwindcss/postcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2f8ff",
          100: "#e6f1ff",
          200: "#c8dfff",
          300: "#a4c7ff",
          400: "#7ba5ff",
          500: "#5079ff",
          600: "#3451f5",
          700: "#2a3fe0",
          800: "#2535b6",
          900: "#23338c",
        },
      },
    },
  },
  plugins: [],
};
