/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue-light': "#C1E8FF",  // Azul claro
        'primary-blue': "#7DA0CA",       // Azul principal
        'primary-blue-dark': "#5483B3",  // Azul oscuro
        'primary-navy': "#052659",       // Azul marino
        'primary-navy-dark': "#021024",  // Azul marino profundo
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}

