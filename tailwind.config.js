/** @type {import('tailwindcss').Config} */
export default {
  // We use class-based dark mode
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        navy: {
          primary: '#0a192f',
          light: '#112240',
          lightest: '#233554',
        },
        slate: {
          DEFAULT: '#8892b0',
          light: '#a8b2d1',
          lightest: '#ccd6f6',
        },
        white: '#e6f1ff',
        green: '#64ffda',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
