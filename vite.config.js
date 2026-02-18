import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cssOptimizePlugin } from './vite-plugin-css-optimize.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue(), cssOptimizePlugin()],
    server: {
    },
    build: {
      assetsDir: 'assets',
      // Ensure all image assets are included
      assetsInclude: ['**/*.webp', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.ico'],
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          // Manual chunk splitting for better caching
          manualChunks: {
            'vendor-vue': ['vue', 'vue-router'],
            'vendor-ui': ['lucide-vue-next', 'vue3-carousel'],
            'vendor-utils': ['axios'],
            'vendor-filepond': ['filepond', 'vue-filepond', 'filepond-plugin-file-validate-type', 'filepond-plugin-image-preview', 'filepond-plugin-image-resize'],
          },
          // Ensure assets are properly handled
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/\.(webp|svg|png|jpg|jpeg)$/.test(assetInfo.name)) {
              return `assets/${info.slice(0, -1).join('.')}-[hash].${ext}`
            }
            return `assets/${assetInfo.name}-[hash].${ext}`
          },
          // Optimize chunk file names
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        }
      },
      // Minification options - using esbuild (built-in, faster than terser)
      minify: 'esbuild',
      // Note: To use terser with drop_console, install terser: npm install -D terser
      // Then change minify to 'terser' and uncomment terserOptions below
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['vue', 'vue-router', 'axios'],
    },
  }
})
