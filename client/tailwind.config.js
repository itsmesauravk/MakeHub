/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F3043A",
        secondary: "#2E2265",
        background: "#FBFBFB",
        'primary-dark': '#D22D3D',
      },
    },
  },
  plugins: [],
}
