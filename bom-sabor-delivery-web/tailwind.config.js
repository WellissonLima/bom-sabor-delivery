/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Isso cobre as pastas components e pages dentro de src
  ],
  theme: {
    extend: {
      colors: {
        'pizza-red': '#E44F3D',
        'burger-yellow': '#FACC15',
        'dark-charcoal': '#2C3E50',
        'light-gray-bg': '#F8F8F8',
      }
    },
  },
  plugins: [],
}