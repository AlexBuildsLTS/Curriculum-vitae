/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Ensures Tailwind scans all your relevant files
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Using Inter as the default sans-serif font
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out forwards', // For elements sliding upward
        'fade-in': 'fadeIn 0.5s ease-out forwards', // For fade-in animations
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' }, // Starting off-screen with opacity 0
          '100%': { transform: 'translateY(0)', opacity: '1' }, // Ends at its natural position with opacity 1
        },
        fadeIn: {
          '0%': { opacity: '0' }, // Invisible
          '100%': { opacity: '1' }, // Fully visible
        },
      },
      colors: {
        // Extend the Tailwind color palette with your custom colors
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
    },
  },
  plugins: [],
};
