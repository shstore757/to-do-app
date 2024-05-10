/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        third: "var(--color-third)",
        forth: "var(--color-forth)",
        neutral: "var(--color-neutral)",
        compl: "var(--color-compl)",
      },
      fontFamily: {
        silks: ["Silkscreen", ...defaultTheme.fontFamily.sans],
        rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
        bask: ["Baskerville Old Face", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
