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
        main: "#029754",
        secondary: "#EBEBEB"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

