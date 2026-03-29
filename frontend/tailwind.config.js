/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#e6f4ea",
          100: "#c3e4cc",
          500: "#2e7d32",
          600: "#1b5e20",
          700: "#145214",
        },
        accent: {
          500: "#1565c0",
          600: "#0d47a1",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
