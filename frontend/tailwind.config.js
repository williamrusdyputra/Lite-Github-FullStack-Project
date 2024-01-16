/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dd2590',
        'button-hover': '#b21a73',
        footer: '#f2f4f7', 
      },
    },
  },
  plugins: [],
};
