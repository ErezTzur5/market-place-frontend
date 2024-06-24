module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project's structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "primary-700": "hsl(256, 26%, 20%)",
        "primary-300": "hsl(216, 30%, 68%)",
        "base-700": "hsl(270, 9%, 17%)",
        "base-500": "hsl(273, 4%, 51%)",
        "base-110": "hsl(0, 0%, 98%)",
      },
      fontFamily: {
        "dm-serif": ['"DM Serif Display"', "serif"],
        karla: ['"Karla"', "sans-serif"],
      },
      screens: {
        "2xl": "1566px",
        "3xl": "1720px",
      },
    },
  },
  plugins: [],
};
