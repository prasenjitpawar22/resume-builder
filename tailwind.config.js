/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        'large-size': '100% 100%',
        'small-size': '320px 20%',
      },
      backgroundImage: {
        'login': "url('../public/resume-background.png')",
        'none': "none"
      },
      backgroundColor: {
        'component-primary': '#8155FF',
        'component-secondary': '#B49AFF'
      },
      fontFamily: {
        Lato: "'Lato', sans-serif"
      },
      textColor: {
        primary: '#434343',
        secondary: '#838383',
        ternary: '#C6C5C5',
      },
      dropShadow: {
        'custom': [
          '0px 4px 70px rgba(0, 0, 0, 0.60)',
        ]
      },
      backdropBlur: {

      },
      fontSize: {

        ...require('tailwindcss/defaultTheme').fontSize
      },

    },
    screens: {
      'phone': '330px',
      // => @media (min-width: 330px) { ... }
      'tablet': '660px',
      // => @media (min-width: 660px) {... }
      'desktop': '1024px',
      // => @media (min-width: 1024px) {... }
    },
  },
  plugins: [],
}
