/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideInFromRight: 'slideInFromRight 0.5s ease-out forwards',
      },
      colors: {
        darkBlue: '#140C1F',
        // orange: '#FF7A29',
        // white: '#ffffff',
      },
    },
  },
  plugins: [],
}
