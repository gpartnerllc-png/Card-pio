/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1118",
        panel: "#111a24",
        "panel-2": "#17212e",
        gold: {
          DEFAULT: "#f4b942",
          light: "#fde29a",
          dim: "#caa354",
        },
        cream: "#fff7e6",
      },
      fontFamily: {
        serif: ["'Fraunces'", "'Playfair Display'", "serif"],
        sans: ["'Libre Franklin'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 12px 30px -12px rgba(244, 185, 66, 0.35)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise .35s ease both",
      },
    },
  },
  plugins: [],
};
