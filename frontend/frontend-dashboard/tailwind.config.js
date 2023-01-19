module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
      extend: {
          fontFamily: {
              gilroy: ['Gilroy', 'sans-serif'],
          },
          colors: {
              primary: '#00b0f5',
              'gs-gray': '#EDECE9',
              'gs-text-gray': "#706D64",
              'gs-dark-gray': '#706D64',
              'gs-black': '#272520',
              'gs-blue': '#3544B6'
          },
          boxShadow: {
              '3xl': '0 0 32px 0 rgba(136, 152, 170, 0.15)',
          },
          keyframes: {
          },
          animation: {
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
