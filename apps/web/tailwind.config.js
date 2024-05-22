/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{jsx, tsx, js, ts}",
    "../../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      metropolis: ['Metropolis', 'sans-serif'],
    },
    colors: {
      main: {
        red: "#C70039",
        blue: "#141E46",
        pink: "#FF6969",
        light: "#FFF5E0",
      },
    },
    extend: {},
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
  },
  plugins: [],
});

// export default {
//   content: [
//   "./index.html",
//   "./src/**/*.{js,ts,jsx,tsx}",],//
//   theme: {
//     extend: {
//       screens: {
//
//       },
//     },
//   },
//   plugins: [],
// }
