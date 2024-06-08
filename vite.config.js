import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: true,
      port: 3000,
      proxy: {
        "/api" : {
          target: "http://pajs02.ide.3wa.io:9000",
          changeOrigin: true
        }
      }
  }
})
