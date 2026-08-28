const config = {
  purge: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
    './**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
    './index.html',
    '!**/node_modules/**',
  ],
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
