/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow:{
        sm: "0px 2px 2px 4px black"
      },
      backgroundColor:{
        logo:"#F28585",
      },
      textColor:{
        navDark:"#11235A",
        navLight:"#596FB7",
      },
      screens:{
        tablet:"1000px"
      }
    },
  },
  plugins: [],
}