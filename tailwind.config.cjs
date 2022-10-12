/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F2EFE9",
          100: "#E4C08B",
        },
        secondary: {
          50: "#226611",
          100: "#324932",
        },
        danger: {
          50: "#DC2525",
        },
      },
    },
  },
  plugins: [],
};
