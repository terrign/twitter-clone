/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
  },
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
  envPrefix: 'APP_',
})
