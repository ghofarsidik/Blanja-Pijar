import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{jsx, tsx, js, ts}",
    "../../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    // "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      blanja_roboto: ["Roboto", "sans-serif"],
      blanja_metropolis: ["Metropolis", "sans-serif"],
    },
    colors: {
      main: {
        red: "#DB3022",
        blue: "#141E46",
        pink: "#FF6969",
        light: "#FFF5E0",
        abu: "#8E8E93",
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
      container2: "1140px",
      dekstop: "1440px",
    },
  },
  plugins: [],
});

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         'xs': '480px',
//         'sm': '640px',
//         'md': '768px',
//         'lg': '1024px',
//         'xl': '1280px',
//         '2xl': '1536px',
//         '3xl': '1920px',
//         'dekstop': '1440px',
//       },
//       colors:{
//         'abu': '#8E8E93',
//       }
//     },
//   },
//   plugins: [],
// }
