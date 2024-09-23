module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#1a202c',  // Color principal personalizado
        secondary: '#2d3748',  // Color secundario personalizado
        accent: '#38b2ac',  // Color de acento
      },
    },
  },
  plugins: [],
};
