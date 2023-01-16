module.exports = {
  content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      extend: {
          fontFamily: {
              gilroy: ['Gilroy', 'sans-serif'],
          },
          colors: {
              primary: '#00b0f5',
              'ace-gray': '#414141',
          },
          boxShadow: {
              '3xl': '0 0 32px 0 rgba(136, 152, 170, 0.15)',
          },
          keyframes: {
              wiggle: {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0 },
              },
          },
          animation: {
              wiggle: 'wiggle 1s ease-in-out infinite',
          },
      },
      fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
          extrabold: 800,
      },
      screens: {
          md: { max: '1000px' },
          sm: { max: '450px' },
      },
  },
  plugins: [],
}
