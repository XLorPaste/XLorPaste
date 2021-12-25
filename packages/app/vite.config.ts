import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import presetWind from '@unocss/preset-wind';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetWind()],
      shortcuts: {
        'navbar-flex': 'flex items-stretch min-h-12 relative'
      },
      theme: {
        boxShadow: {
          navbar: '0 2px 0 0 #f5f5f5'
        }
      }
    })
  ]
});
