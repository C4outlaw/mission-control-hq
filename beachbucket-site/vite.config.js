import { defineConfig } from 'vite'

// GitHub Pages project site base path
export default defineConfig({
  base: '/marvin-room-hq/',
  server: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
    allowedHosts: [
      '.trycloudflare.com',
      '.lhr.life',
      'localhost',
      '127.0.0.1'
    ]
  }
})
