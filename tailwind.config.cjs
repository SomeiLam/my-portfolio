module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Ensure this matches your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
