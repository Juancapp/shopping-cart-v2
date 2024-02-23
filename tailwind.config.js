/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        "main-bg-color": "#273043",
      },
    },
    fontFamily: {
      sans: ["Helvetica", "ui-sans-serif", "system-ui"],
    },
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [],
};
