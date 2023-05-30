/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black1: '#04152d',
        black2: '#041226',
        black3: '#020c1b',
        blackLighter: '#1c4b91',
        blackLight: '#173d77',
        pink1: '#da2f68',
        orange: '#f89e00',
        gradient: 'linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)'
      },
      animation: {
        mobileMenu: 'mobileMenu .3s ease forwards'
      },
      keyframes: {
        mobileMenu: {
          '0%': {
            transform: 'translateY(-130%)'
          },
          '100%': { transform: 'translateY(0)' }
        },

      },
      plugins: [],
    }
  }
}
