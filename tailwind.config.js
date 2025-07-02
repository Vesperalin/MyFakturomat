/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '.src/app/**/*.{js,ts,jsx,tsx}',
    '.src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {}, // here i can customize theme
  },
  plugins: [], // here I can add forms, typography, daisyUI etc.
};
