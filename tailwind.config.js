/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5F41B2',
        'primary-light': '#6F51C2',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], //default font
        abhaya: ['Abhaya Libre', 'serif'],
      },
      animation: {
        enter: 'linear-enter 300ms ease-in',
        'notification-enter': 'linear-enter 200ms ease-in-out',
      },
      keyframes: {
        'linear-enter': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
