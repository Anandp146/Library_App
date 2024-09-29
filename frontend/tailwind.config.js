/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-light": "#4b6cb7",
        "blue-dark": "#182848",
      },
      backgroundImage: {
        "linear-gradient": "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
      },
    },
  },
  plugins: [],
};
