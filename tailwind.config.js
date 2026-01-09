/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: '#2a41e8',
        'primary-dark': '#1e2fa8',
        yellow: '#ffc40d',
        'bg-dark': '#1a1a1a',
      },
    },
  },
  plugins: [],
}

