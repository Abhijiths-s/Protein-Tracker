/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors:{
        background:"#F5F7F9",
        secbg:"#D9DDE0",
        primary:"#2C2F31",
        secondary:"#595C5E",
        primgreen:"#1E5D43",
        
      },
      fontFamily:{
        jakarta:["Plus Jakarta Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}

