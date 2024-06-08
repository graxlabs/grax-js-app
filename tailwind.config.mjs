/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  daisyui: {
    themes: ["dark", "cupcake"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
