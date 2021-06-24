const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter'],
    },
    colors: {
      ...colors,
      gray: colors.gray,
    },
  },
}
