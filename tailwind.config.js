// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Ensure Tailwind scans all relevant files
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
        sans: ['Inter', 'system-ui', 'sans-serif'], // Using Inter as the default sans-serif font
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
