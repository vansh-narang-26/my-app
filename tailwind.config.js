/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'manrope': 'Manrope',
      },
      colors: {
        'primary-orange': '#FF5722',
      }
    },
  },
  plugins: [],
}