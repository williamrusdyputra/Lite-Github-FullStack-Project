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
        'vs-public': '#eeeefb',
        'vs-public-text': '#8f70e6',
        'vs-private': '#eceff3',
        'vs-private-text': '#8f97a3',
      },
    },
  },
  plugins: [],
};
