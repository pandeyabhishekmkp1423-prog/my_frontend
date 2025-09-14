/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#ccf5f5'
      },
      backgroundColor:{
        primary:'#ccf5f5'
      }
    },
  },
  plugins: [],
}

