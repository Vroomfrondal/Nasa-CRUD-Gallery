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
        onLoadAppear: 'appear 3s ease-out',
        dateBounce: 'dateBounce 1.5s ease 1',
      },
      keyframes: () => ({
        slideInLeft: {
          '0%': { 'margin-right': '100%' },
          '100%': { 'margin-right': '0%' },
        },
        slideInNav: {
          '0%': { transform: 'translate(100%, 0%)' },
        },
        appear: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
        dateBounce: {
          // Scale adds distortion, percentages add delay,
          '0%': {
            transform: 'scale(1,1) translateY(0)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
          '10%': {
            transform: 'scale(1.1,.9) translateY(0)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
          '30%': {
            transform: 'scale(.9,1.1) translateY(-75px)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
          '50%': {
            transform: 'scale(1.05,.95) translateY(0)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
          '57%': {
            transform: 'scale(1,1) translateY(-5px)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
          '64%': {
            transform: 'scale(1,1) translateY(0)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
          '100%': {
            transform: 'scale(1,1) translateY(0)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      }),
    },
  },
  plugins: [],
}
