/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.{html,ejs,js}',
    './public/**/*.{html,ejs,js}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  purge: {
    content: [
      './views/**/*.{html,ejs,js}',
      './public/**/*.{html,ejs,js}'
    ],
    options: {
      safelist: [
        /data-theme$/,
      ]
    },
  },
}
