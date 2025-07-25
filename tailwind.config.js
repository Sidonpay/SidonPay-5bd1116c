/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
      },
      colors: {
        base_white: "#f8f8f8",
        error: "#FF3446",
        warning: "#FC6322",
        success: "#44B97B",
        brand_color1: "#2D7A51",
        brand_color2: "#151E31",
        button_primary: "#2D7A51",
        button: "#55BB84",
        secondary: "#7B7B7B",
        contrast: "#A7A7A7",
        base_gray: "#DDE5EF",
      },
    },
  },
  plugins: [],
};
