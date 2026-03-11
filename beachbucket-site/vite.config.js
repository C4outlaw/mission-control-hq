import { defineConfig } from 'vite'

export default defineConfig({
  base: '/mission-control-hq/',
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
