/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf7e4',
          100: '#f5ebba',
          200: '#eede8f',
          300: '#e7d063',
          400: '#e0c338',
          500: '#d9b50d',
          600: '#b3950b',
          700: '#8c7408',
          800: '#665406',
          900: '#403303',
        },
      },
    },
  },
  plugins: [],
};