/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0059ff",
      },
      boxShadow: {
        "around-sm": "0 0 15px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
