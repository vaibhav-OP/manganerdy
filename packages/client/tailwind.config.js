/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        themeColor: "#302b63"
      },
      backgroundImage: {
        themeLinearGradient: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        darkthemeLinearGradient: "linear-gradient(to left bottom, #232526, #414345)"
      },
      gridTemplateColumns: {
        "custom0": "2fr 1fr",
      },
      fontFamily: {
        poppin: ["Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
      },
      borderColor: {
        themeColor: "#302b63"
      },
      textColor: {
        theme: "#302b63"
      },
      gridAutoColumns: {
        full: "100%"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],
}
