/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url(https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-preview.jpg)",
        'h-pattern-2': "url(https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?size=626&ext=jpg&uid=R109199799&ga=GA1.1.1199543649.1704347212&semt=sph)"
      },
      textShadow: {
        sm: "0px 2px 2px 4px black"
      },
      backgroundColor: {
        logo: "#F28585",
      },
      textColor: {
        navDark: "#11235A",
        navLight: "#596FB7",
      },
      screens: {
        tablet: "1000px"
      },
      minWidth: {
        half: "45%"
      },
      maxWidth: {
        "2/3": "66.6%"
      }
    },
  },
  plugins: [],
}