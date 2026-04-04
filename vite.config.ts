import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Tell Vite that the app is served from a subfolder on GitHub Pages.
  // Without this, asset URLs like /assets/index.js would 404 because
  // the site lives at /booster-agent-poc/, not at the domain root.
  base: '/booster-agent-poc/',
  plugins: [react()],
})
