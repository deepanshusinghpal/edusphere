/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand': {
          'superlight': 'hsl(167, 40%, 95%)', 
          'light': '#00758D',
          'DEFAULT': '#002D42',
          'dark': 'rgb(0, 38, 43)', // <-- YOUR NEW DARK FOOTER COLOR
        },
        'edx-gray': {
          'light': '#f7f9fa',
          'DEFAULT': '#6C757D',
          'dark': '#1c1d1f',
        },
        'edx-green': '#008542',
        'edx-yellow': '#ffc107',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

