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
    screens: {
      'tablet': '668px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        'purpleTheme': '#AD1FEA',
        'blueTheme': '#4661E6',
        'blueBlackTheme': '#373F68',
        'grayTheme': '#F2F4FE',
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
