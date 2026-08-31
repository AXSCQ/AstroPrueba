/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Chasis y arquitectura física de consola de estudio
        'studio': {
          'chassis': {
            950: '#111215',
            900: '#17191e',
            850: '#1f2228',
            800: '#262931',
            700: '#323742',
            600: '#414755',
            500: '#586073',
          },
          // Acentos de hardware físico (botones, perillas, indicadores)
          'amber': '#f59e0b',
          'amber-dim': '#b45309',
          'red': '#dc2626',
          'red-dim': '#991b1b',
          'green': '#16a34a',
          'green-dim': '#15803d',
          'slate': '#38bdf8',
          'slate-dim': '#0284c7',
          'cream': '#ede8df',
          'cream-dim': '#c8c2b5',
          'steel': '#94a3b8',
          'gold': '#eab308',
        },
        // Compatibilidad con chasis previo mapeado a tonos profesionales
        'cyber': {
          950: '#111215',
          900: '#17191e',
          800: '#262931',
          700: '#323742',
          600: '#414755',
        },
        // Acentos remapeados a indicadores nítidos de consola (cero neón estridente)
        'neon': {
          blue: '#38bdf8',    // Azul pizarra técnico
          purple: '#f59e0b',  // Ámbar cálido de consola
          pink: '#dc2626',    // Rojo mate recording
          green: '#16a34a',   // Verde señal analógica
        },
        // LEDs funcionales de medidores VU
        'led': {
          green: '#16a34a',
          amber: '#f59e0b',
          red: '#dc2626',
          slate: '#38bdf8',
        },
      },
      boxShadow: {
        // Indicadores LED nítidos y localizados
        'led-green': '0 0 3px #16a34a, 0 0 6px rgba(22,163,74,0.4)',
        'led-amber': '0 0 3px #f59e0b, 0 0 6px rgba(245,158,11,0.4)',
        'led-red': '0 0 3px #dc2626, 0 0 6px rgba(220,38,38,0.4)',
        'led-slate': '0 0 3px #38bdf8, 0 0 6px rgba(56,189,248,0.4)',
        'neon': '0 0 2px #38bdf8, 0 0 5px rgba(56,189,248,0.3)',
        'neon-strong': '0 0 3px #38bdf8, 0 0 8px rgba(56,189,248,0.4)',
        // Biseles y volumen de hardware analógico de estudio
        'bezel-in': 'inset 0 2px 4px rgba(0,0,0,0.7), inset 0 -1px 1px rgba(255,255,255,0.06)',
        'bezel-out': '0 1px 1px rgba(255,255,255,0.1), 0 3px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
        'rack-panel': '0 4px 16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.8)',
        'screw': 'inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.8)',
        'fader-cap': '0 2px 4px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(0,0,0,0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'led-blink 2.4s steps(2, jump-none) infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
      },
      keyframes: {
        'led-blink': {
          '0%, 49%': { boxShadow: '0 0 2px #16a34a, 0 0 5px rgba(22,163,74,0.5)', opacity: '1' },
          '50%, 100%': { boxShadow: '0 0 1px #16a34a', opacity: '0.8' }
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.35)' }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
