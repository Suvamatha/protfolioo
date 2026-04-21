/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: '#020617',
          1: '#0f172a',
        },
      },
      backgroundImage: {
        'gradient-mesh': "radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.15) 0, transparent 50%)",
      },
    },
  },
  plugins: [],
}
