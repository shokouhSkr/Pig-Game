module.exports = {
  content: ["./public/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      // padding: "1rem",
    },
    extend: {
      fontFamily: {
        sans: ["Vazir"],
        Malayalam: ['"Anek Malayalam"', "serif"],
      },
      screens: {
        "2xs": "375px",
        xs: "425px",
        "3xl": "1440px",
      },
    },
  },
  plugins: [],
};
