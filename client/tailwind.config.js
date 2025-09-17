// tailwind.config.cjs

import animatePlugin from "tailwindcss-animate";

export default {
  darkMode: ["class"], // or ['class', '[data-theme="dark"]'] if you use data attribute
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // adjust these to where your Shadcn UI components / pages / app layout files are
  ],
  // theme: {
  //   container: {
  //     center: true,
  //     padding: "2rem",
  //     screens: {
  //       "2xl": "1400px",
  //     },
  //   },
  extend: {},
  // },
  plugins: [
    animatePlugin,
    // add any other plugins required by Shadcn or your project
  ],
};
