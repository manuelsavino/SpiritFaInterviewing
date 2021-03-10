const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/pages/*.js', './src/components/**/*.js'],
  theme: {
    colors: {
      blue: colors.blue,
      red: colors.red,
      white: colors.white,
      black: colors.black,
      gray: colors.trueGray,
    },
  },
};
