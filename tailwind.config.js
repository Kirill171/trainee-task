module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true
    },
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1280px'
    },
    extend: {
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        lexend: ['Lexend Deca', 'sans-serif']
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(90deg, #343333 17%, #484848 69%, #282828 99%)'
      }
    }
  },
  plugins: []
};
