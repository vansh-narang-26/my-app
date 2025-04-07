/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'work-sans-bold': ["'work-sans-bold'", 'sans-serif'],
        'work-sans-extrabold': ["'work-sans-extrabold'", 'sans-serif'],
        'work-sans-semibold': ["'work-sans-semibold'", 'sans-serif'],
        'work-sans-medium': ["'work-sans-medium'", 'sans-serif'],
        'work-sans-regular': ["'work-sans-regular'", 'sans-serif'],
        'work-sans-light': ["'work-sans-light'", 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
      },
      screens: {
        '2xl': '1536px', // Make sure this breakpoint is defined
      }
    },
  },
  plugins: [],
};


// // tailwind.config.js
// module.exports = {
//   // other configs...
//   theme: {
//     extend: {
//       fontFamily: {
//         'sans': ['work-sans-regular', 'sans-serif'],
//         'bold': ['work-sans-bold', 'sans-serif'],
//         'extrabold': ['work-sans-extrabold', 'sans-serif'],
//         'semibold': ['work-sans-semibold', 'sans-serif'],
//         'medium': ['work-sans-medium', 'sans-serif'],
//         'light': ['work-sans-light', 'sans-serif'],
//       },
//       fontSize: {
//         '6xl': '6rem', // h1
//         '3xl': '3.8rem', // h2
//         '2xl': '2.6rem', // h3
//         'lg': '2rem', // p
//         'base': '1.6rem', // body
//       },
//       lineHeight: {
//         'normal': '1.5', // body
//         'short': '130%', // h2, h3
//         'tight': '155%', // p
//       },
//       colors: {
//         darkBlue: '#213047',
//         lightBlue: '#002C5A',
//       },
//     },
//   },
//   plugins: [],
// }