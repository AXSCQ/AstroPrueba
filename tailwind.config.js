/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'cyber': {
          950: '#0a0a0f',
          900: '#121218',
          800: '#1a1a24',
          700: '#252532',
          600: '#2f2f40',
        },
        'neon': {
          blue: '#00f3ff',
          purple: '#8a2be2',
          pink: '#ff00ff',
          green: '#00ff9d',
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
        'neon-strong': '0 0 10px theme(colors.neon.blue), 0 0 40px theme(colors.neon.blue)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)' },
          '100%': { boxShadow: '0 0 10px theme(colors.neon.blue), 0 0 40px theme(colors.neon.blue)' }
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.5)' }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

// Redesigned project section to be more visually engaging with hover effects and updated colors.
