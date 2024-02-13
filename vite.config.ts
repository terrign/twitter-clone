import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@components', replacement: path.resolve(__dirname, './src/components/index') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages/index') },
      { find: '@router', replacement: path.resolve(__dirname, './src/router/index') },
      { find: '@auth', replacement: path.resolve(__dirname, './src/auth/index') },
      { find: '@types', replacement: path.resolve(__dirname, './src/types/index') },
      { find: '@constants', replacement: path.resolve(__dirname, './src/constants/index') },
      { find: '@context', replacement: path.resolve(__dirname, './src/context/index') },
      { find: '@store', replacement: path.resolve(__dirname, './src/store/index') },
    ],
  },
  envPrefix: 'APP_',
})
