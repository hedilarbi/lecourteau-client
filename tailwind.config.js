/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pr: "#F7A600",
        bg: "#EBEBEB",
        tgry: "#675E5E",
        gry: "#FBFBFB",
        lgry: "#F6F6F6",
      },
    },
  },
  plugins: [],
};
