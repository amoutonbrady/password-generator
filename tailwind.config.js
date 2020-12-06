const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['src/**/*.tsx', 'public/index.html'],
  dark: 'class',
  theme: {
    extend: { colors },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};
