/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        "main-bg-color": "#273043",
      },
    },
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [],
};
