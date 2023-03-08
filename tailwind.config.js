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
      fontFamily:{
        Lato: "'Lato', sans-serif"
      },
      textColor:{
        primary: '#2A1E17'
      },
      dropShadow:{
        'custom':[
          '0px 4px 70px rgba(0, 0, 0, 0.60)',
        ]
      },
      backdropBlur:{
        
      }
    },
    screens: {
      'phone': '290px',
      // => @media (min-width: 390px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
