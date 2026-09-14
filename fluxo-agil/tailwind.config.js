/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fluxo-light': '#f5f5f5',
        'fluxo-gray-light': '#e9e9e9',
        'fluxo-teal-dark': '#006666',
        'fluxo-teal': '#008584',
        'fluxo-gray': '#cccccc',
        'fluxo-green': '#d0dcb3',
        'fluxo-orange': '#dabd90',
        'fluxo-red-light': '#df7670',
        'fluxo-pink': '#f4065e',
        'fluxo-brown': '#837d72',
      },
    },
  },
  plugins: [],
}
