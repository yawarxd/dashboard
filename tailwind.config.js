/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gray: {
          900: '#121212',
          800: '#1e1e1e',
          700: '#2d2d2d',
          600: '#404040',
          500: '#5a5a5a',
          400: '#7a7a7a',
          300: '#9a9a9a',
          200: '#bababa',
          100: '#dadada',
        },
        green: {
          400: '#00FF85',
          500: '#00e577',
        },
      },
      boxShadow: {
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'green-400/25': '0 0 25px rgba(0, 255, 133, 0.25)',
        'red-500/25': '0 0 25px rgba(239, 68, 68, 0.25)',
      },
    },
  },
  plugins: [],
};