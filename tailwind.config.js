/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        ns_primary: "#0092E6",
        ns_secondary: "#acdef7",
        ns_background: "#ffffff",
        ns_text: "#060809",
        ns_accent: "#3582b1",
      },
    },
  },
  plugins: [],
};

