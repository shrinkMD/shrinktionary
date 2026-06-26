module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        sky: "#CAEBF2",
        carbon: "#6B6B6B",
        "carbon-soft": "#A9A9A9",
        watermelon: "#C81E2D",
        "watermelon-bright": "#FF3B3F",
        neutral: "#EFEFEF",
        ink: "#111111",
      },
      fontFamily: {
        display: ['"Source Serif 4"', '"Source Serif Pro"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
