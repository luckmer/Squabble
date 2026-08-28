const config = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '../packages/**/*.tsx'],
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
