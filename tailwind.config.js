/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'md': '768px',
        'lg': '1024px',
      },
      colors: {
        main: "#26C165",
        secondary: "#EBEBEB"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Use Poppins for sans-serif
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

