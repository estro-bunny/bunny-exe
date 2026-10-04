import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' lets it work on GitHub Pages under /<repo>/
export default defineConfig({ base: './', plugins: [react()] })
