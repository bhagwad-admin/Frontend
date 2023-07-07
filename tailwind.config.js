/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      translate: {
        0: "0",
        full: "100%",
      },
    },
  },
  plugins: [],
};
