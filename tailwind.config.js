/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'measuremint': '#10bb82',
      },
      fontFamily: {
        'noto-sans-arabic': ['var(--font-noto-sans-arabic)', 'Noto Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
