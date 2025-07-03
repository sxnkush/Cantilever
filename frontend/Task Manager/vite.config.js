import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/task': {
        target: 'https://task-manager-180.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
      '/api/user': {
        target: 'https://task-manager-180.onrender.com/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
