/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/shadcn-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        accent: "#ffc107",
        success: "#28a745",
        error: "#dc3545",
        info: "#17a2b8",
        warning: "#ffc107",
        light: "#f8f9fa",
        dark: "#343a40",
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
