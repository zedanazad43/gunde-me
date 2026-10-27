/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kurdGold: '#FFC72C',
        kurdRed: '#EE2A24',
        kurdGreen: '#009739',
        kurdSky: '#48CAE4',
        villageWood: '#8D5B4C',
      },
      animation: {
        'bounce-soft': 'bounce 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 10px rgba(255, 199, 44, 0.6))' },
          '50%': { transform: 'scale(1.04)', filter: 'drop-shadow(0 0 20px rgba(255, 199, 44, 0.9))' },
        }
      }
    },
  },
  plugins: [],
}
