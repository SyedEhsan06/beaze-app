/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors : {
        'theme-main-color' : '#FFEA00',
        'theme-footer-bg' : '#2A0241',
        'rating-stars' : '#FEDB18',
        'text-secondary' : '#2A0241',
        'button-secondary' : '#F8B43A'
      }
    },
  },
  plugins: [],
}
