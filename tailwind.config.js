/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    screens: {
      sm: '320px',
      md: '738px',
      lg: '880px',
      xl: '1020px',
      xxl: '2160px',
    },
    gridTemplateColumns: {
      4: 'repeat(4, minmax(10rem, 1fr))',
    },
    extend: {
      colors: {
        cream: '#ffffff',
        bg_black: '#121212',
        pure_black: '#000000',
        navy_blue: '#141721',
        hover_opaque: 'rgba(255, 255, 255, 0.3)',
        modal_blackout: 'rgba(0, 0, 0, 0.7)',
      },
      fontFamily: {
        Raleway: ['Raleway', 'sans-serif'],
      },
      backgroundImage: {
        banner: "url('./media/earth-background.jpg')",
      },
      animation: {
        slideInLeft: 'slideInLeft 1s',
        slideInNav: 'slideInNav 0.4s ease-out',
      },
      keyframes: () => ({
        slideInLeft: {
          '0%': { 'margin-right': '100%' },
          '100%': { 'margin-right': '0%' },
        },
        slideInNav: {
          '0%': { transform: 'translate(100%, 0%)' },
        },
      }),
    },
  },
  plugins: [],
}
