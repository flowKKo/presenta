import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import deckApiPlugin from './vite-plugin-deck-api'

export default defineConfig({
  plugins: [react(), tailwindcss(), deckApiPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          echarts: ['echarts', 'echarts-for-react'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
