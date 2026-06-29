/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          dark: '#141414',
          gray: '#808080',
          lightgray: '#B3B3B3',
        },
      },
      fontFamily: { sans: ['Netflix Sans', 'Helvetica Neue', 'Segoe UI', 'sans-serif'] },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
