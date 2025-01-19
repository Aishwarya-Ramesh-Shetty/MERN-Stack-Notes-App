/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '100':'27rem',
        '200': '29.5rem',
        '400':'70rem',
        '500':'78rem'
      },
      height:{
        '100':'32rem',
        '90':'20rem'
      },
      colors:{
        
        'newblue':'#00b4d8',
        'newgray':'#343a40',
        'newgreen':'#38b000'
      }
  },
  plugins: [],
}
}
