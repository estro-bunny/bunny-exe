/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'vt323': ['"VT323"', 'monospace'],
        'press': ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        'neon-pink': '#ff00ff',
        'neon-blue': '#00ffff',
        'neon-green': '#00ff00',
        'neon-yellow': '#ffff00',
        'void-black': '#050505',
        'terminal-green': '#0f0',
      },
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite',
        'glitch': 'glitch 1s linear infinite',
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rainbow': 'rainbow 2s linear infinite',
        'bounce-chaos': 'bounce-chaos 0.5s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-2px, 0, 0) rotate(-2deg)' },
          '20%, 80%': { transform: 'translate3d(4px, 0, 0) rotate(4deg)' },
          '30%, 50%, 70%': { transform: 'translate3d(-6px, 0, 0) rotate(-6deg)' },
          '40%, 60%': { transform: 'translate3d(6px, 0, 0) rotate(6deg)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)', clipPath: 'inset(0 0 0 0)' },
          '20%': { transform: 'translate(-4px, 4px)', clipPath: 'inset(20% 0 40% 0)' },
          '40%': { transform: 'translate(4px, -4px)', clipPath: 'inset(60% 0 10% 0)' },
          '60%': { transform: 'translate(-2px, -2px)', clipPath: 'inset(10% 0 70% 0)' },
          '80%': { transform: 'translate(2px, 2px)', clipPath: 'inset(80% 0 5% 0)' },
          '100%': { transform: 'translate(0)', clipPath: 'inset(0 0 0 0)' },
        },
        'bounce-chaos': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.1) rotate(5deg)' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        }
      },
      backgroundImage: {
        'scanlines': "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))",
        'grid': "linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'scanlines': '100% 4px',
        'grid': '40px 40px',
      }
    },
  },
  plugins: [],
}
