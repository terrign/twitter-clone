import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    ViteImageOptimizer({
      webp: {
        quality: 80,
      },
    }),
  ],

  resolve: {
    alias: [
      { find: '@components', replacement: path.resolve(__dirname, './src/components/') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages/') },
      { find: '@router', replacement: path.resolve(__dirname, './src/router/') },
      { find: '@services', replacement: path.resolve(__dirname, './src/services/') },
      { find: '@models', replacement: path.resolve(__dirname, './src/models/') },
      { find: '@constants', replacement: path.resolve(__dirname, './src/constants/') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils/') },
      { find: '@context', replacement: path.resolve(__dirname, './src/context/') },
      { find: '@store', replacement: path.resolve(__dirname, './src/store/') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets/') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks/') },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        compact: true,
        manualChunks(id: string) {
          if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react')) {
            return 'react'
          }
          if (id.includes('firebase/firestore')) {
            return 'store'
          }
          if (id.includes('firebase/auth')) {
            return 'auth'
          }
          if (id.includes('firebase/storage')) {
            return 'storage'
          }
        },
      },
    },
  },

  envPrefix: 'APP_',
})
