import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: change 'anniversary-app' to your actual GitHub repo name
  base: '/anniversary-app/',
})
