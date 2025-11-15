/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-1': 'rgba(26, 46, 5)',
        'theme-2': 'rgb(19, 78, 74)',
        'primary': 'rgb(26, 46, 5)',
        'secondary': 'rgb(226, 232, 240)',
        'success': 'rgb(13, 148, 136)',
        'info': 'rgb(8, 145, 178)',
        'warning': 'rgb(202, 138, 4)',
        'pending': 'rgb(194, 65, 12)',
        'danger': 'rgb(185, 28, 28)',
        'light': 'rgb(241, 245, 249)',
        'dark': 'rgb(30, 41, 59)',
        'primary-text': '#475569',
        'secondary-dark-text': '#475569',
        'secondary-light-text': '#64748b',
      },
    },
  },
  plugins: [],
}

