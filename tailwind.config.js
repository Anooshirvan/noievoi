/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5E15',
        secondary: '#0E1B4D',
        accent: '#35BDF2',
        dark: '#292929',
        light: '#F8F9FA',
      },
    },
  },
  plugins: [],
}; 