/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { left: '-100px' },
          '60%, 100%': { left: '100%' },
        },
      },
      animation: {
        shine: 'shine 1.5s ease-out infinite',
      },
    },
  },
  plugins: [animate],
};
