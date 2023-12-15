import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
          enabled: true,
      },
      includeAssets: ['icone.png', 'icone-500.png'],
      manifest: {
          name: 'Le donjon de monstres',
          short_name: 'DM',
          description: 'Ça grouille par ici !',
          theme_color: '#1a17d4',
          icons: [
          {
              src: 'icone.png',
              sizes: '250x250',
              type: 'image/png',
              purpose: 'maskable'
          },
          {
            src: 'icone-500.png',
            sizes: '512x512',
            type: 'image/png',
          }
          ],
      },
      })
    ],
})
