import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { visualizer } from 'rollup-plugin-visualizer';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    compress({
      // Configuración para compresión de imágenes
      img: {
        quality: 80, // Calidad de compresión (0-100)
      },
      css: true,
      html: {
        removeComments: true,
      },
      js: true,
      svg: {
        multipass: true,
      },
    }),
  ],
  // Optimizaciones de imagen para Lighthouse
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  vite: {
    build: {
      // Dividir el bundle para reducir JS inicial
      rollupOptions: {
        output: {
          manualChunks: {
            // Separar librerías pesadas
            'vendor-audio': ['wavesurfer.js'],
            'vendor-animation': ['aos'],
          },
        },
      },
      // Minificar de manera más agresiva
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remover console.log en producción
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.warn'],
        },
      },
    },
    plugins: [
      visualizer({
        open: false, // No abrir automáticamente para build más rápido
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    build: {
      // Optimizaciones para producción
      minify: 'terser',
      terserOptions: {
        compress: {
          // Eliminar console.logs en producción (manteniendo console.error)
          pure_funcs: ['console.log', 'console.warn'],
          drop_debugger: true,
        },
      },
    },
  },
});
