/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Ensures Tailwind works in all components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
