/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'jost': ['Jost', 'sans-serif']
    },
    extend: {
      colors: {
        'purpleTheme': '#AD1FEA',
        'blueTheme': '#4661E6',
        'blueBlackTheme': '#373F68',
        'grayTheme': '#F2F4FF',
        'lighterGrayTheme': '#F758FD',
        'lighterBlueBlackTheme': '#3A4374',
        'darkGrayTheme': '#647196',
        'lighterRedTheme': '#F49F85',
        'lighterBlueTheme': '#62BCFA'
      }
    },
  },
  plugins: [],
}
