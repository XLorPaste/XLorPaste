import { readFileSync } from 'fs';
import { defineConfig, Plugin } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';
import Icons from 'unplugin-icons/vite';
import Unocss from 'unocss/vite';
import presetWind from '@unocss/preset-wind';
import { version } from './package.json';

const mdPlugin: Plugin[] = [
  Markdown({
    wrapperClasses: 'markdown-body'
  }),
  {
    name: 'readme',
    resolveId(id) {
      if (id === '~README.md') {
        return id;
      }
    },
    async load(id) {
      if (id === '~README.md') {
        const text = readFileSync('./README.md', 'utf-8');
        return text.replace(/public\/(.+\.png)/g, '/$1');
      }
    }
  }
];

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(version),
    __COMMIT__: JSON.stringify(process.env.GITHUB_SHA)
  },
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    mdPlugin,
    Icons(),
    Unocss({
      presets: [presetWind()],
      shortcuts: {
        'navbar-flex': 'flex <md:flex-col items-stretch min-h-12 relative'
      },
      theme: {
        boxShadow: {
          navbar: '0 2px 0 0 #f5f5f5'
        },
        fontFamily: {
          mono: ['var(--font-family-mono)', 'var(--font-family-base)']
        }
      },
      variants: [
        (matcher) => {
          if (matcher.startsWith('<md:')) {
            return {
              matcher: matcher.slice(4),
              parent: [`@media (max-width: 767.9px)`, 999]
            };
          } else if (matcher.startsWith('md:')) {
            return {
              matcher: matcher.slice(3),
              parent: [`@media (min-width: 768px)`, 1001]
            };
          } else {
            return matcher;
          }
        },
        (matcher) => {
          if (matcher.startsWith('focus:')) {
            return {
              matcher: matcher.slice(6),
              selector: (s) => `${s}:focus`
            };
          } else {
            return matcher;
          }
        }
      ]
    })
  ]
});
