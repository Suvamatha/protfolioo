import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 5174 so it never collides with FlutterShow's dev server on 5173.
  server: { port: 5174 },
})
