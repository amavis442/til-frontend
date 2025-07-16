const typography = require('@tailwindcss/typography');

module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {},
    },
    plugins: [typography],
  };