/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      brownish: "#756050",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        spinY: {
          "0%": {
            transform: "rotateY(0deg)",
            color: "red",
            textShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
          },
          "25%": {
            color: "blue",
            textShadow: "0 0 10px rgba(0, 0, 255, 0.8)",
          },
          "50%": {
            transform: "rotateY(180deg)",
            color: "green",
            textShadow: "0 0 10px rgba(0, 255, 0, 0.8)",
          },
          "75%": {
            color: "purple",
            textShadow: "0 0 10px rgba(255, 255, 0, 0.8)",
          },
          "100%": {
            transform: "rotateY(360deg)",
            color: "red",
            textShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
          },
        },
        dotPulse: {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
        shake: {
          "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
          "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
          "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
          "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
          "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
          "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
          "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
          "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
          "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
          "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
          "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
        },
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)",
        ],
      },
    },
    animation: {
      spinY: "spinY 10s infinite",
      shake: "shake 0.5s",
      dotPulse: "dotPulse 10s"
    },
  },
  plugins: [],
};
