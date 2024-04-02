/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // content: [
  //   './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
  //   './pages/**/*.{js,ts,jsx,tsx,mdx}',
  //   './components/**/*.{js,ts,jsx,tsx,mdx}',
 
  //   // Or if using `src` directory:
  //   './src/**/*.{js,ts,jsx,tsx,mdx}',
  // ],
  theme: {
    extend: {},
  },
  plugins: [],
}