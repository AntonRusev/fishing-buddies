/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    fontFamily: {
      'lato': ['Lato', 'serif'],
      'serif': ['DM Serif Display', 'serif']
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: "class",
}

