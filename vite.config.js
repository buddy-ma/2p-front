import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    server: {
    },
    build: {
      assetsDir: 'assets',
      // Ensure all image assets are included
      assetsInclude: ['**/*.webp', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.ico'],
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Ensure assets are properly handled
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/\.(webp|svg|png|jpg|jpeg)$/.test(assetInfo.name)) {
              return `assets/${info.slice(0, -1).join('.')}-[hash].${ext}`
            }
            return `assets/${assetInfo.name}-[hash].${ext}`
          }
        }
      }
    }
  }
})
