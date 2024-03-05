/// <reference types="vite-plugin-svgr/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      include: '**/*.svg?react',
    }),
    react(),
    ViteImageOptimizer({
      webp: {
        quality: 80,
      },
    }),
    splitVendorChunkPlugin(),
  ],

  resolve: {
    alias: [
      { find: '@components', replacement: path.resolve(__dirname, './src/components/index') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages/index') },
      { find: '@router', replacement: path.resolve(__dirname, './src/router/index') },
      { find: '@services', replacement: path.resolve(__dirname, './src/services/index') },
      { find: '@types', replacement: path.resolve(__dirname, './src/types/index') },
      { find: '@constants', replacement: path.resolve(__dirname, './src/constants/index') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils/index') },
      { find: '@context', replacement: path.resolve(__dirname, './src/context/index') },
      { find: '@store', replacement: path.resolve(__dirname, './src/store/index') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets/index') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks/index') },
      { find: '@ui', replacement: path.resolve(__dirname, './src/components/UI/index') },
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
