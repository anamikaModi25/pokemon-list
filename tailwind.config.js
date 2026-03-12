/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        mono: ["Spline Sans Mono", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        ink: {
          50: "#f6f6f1",
          100: "#eceadd",
          200: "#d8d4b9",
          300: "#bfb78f",
          400: "#a89d6b",
          500: "#8c8355",
          600: "#706845",
          700: "#5a5338",
          800: "#47432e",
          900: "#2b2a20",
        },
        mango: {
          100: "#fff2cf",
          200: "#ffe29b",
          300: "#ffc765",
          400: "#ffad3d",
          500: "#ff8e1f",
        },
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(15, 23, 42, 0.5)",
      },
    },
  },
  plugins: [],
};
