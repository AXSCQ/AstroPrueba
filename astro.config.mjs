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
          },
        },
      },
      // Minificar de manera más agresiva
      minify: 'terser',
      terserOptions: {
        compress: {
          // Eliminar console.log/warn en producción (manteniendo console.error a propósito,
          // MultiTrackAudioVisualizer.astro depende de ellos para debugging en prod)
          pure_funcs: ['console.log', 'console.warn'],
          drop_debugger: true,
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
  },
});
