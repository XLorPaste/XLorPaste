import path from 'node:path';
import { readFileSync } from 'node:fs';

import { defineConfig, Plugin } from 'vite';
import Vue from '@vitejs/plugin-vue';

import Info from 'vite-plugin-info';
import Unocss from 'unocss/vite';
import Pages from 'vite-plugin-pages';
import Markdown from 'vite-plugin-md';
import AutoImport from 'unplugin-auto-import/vite';

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
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    mdPlugin,
    Info(),
    AutoImport({
      imports: ['vue', 'vue/macros', '@vueuse/core', 'vue-router'],
      vueTemplate: true,
      dts: './src/auto-imports.d.ts'
    }),
    Pages({
      dirs: 'src/pages',
      exclude: ['**/components/*.vue'],
      importMode(filepath) {
        if (filepath.startsWith('/src/pages/Index.vue')) {
          return 'sync';
        } else if (filepath.startsWith('/src/pages/[token].vue')) {
          return 'sync';
        } else {
          return 'async';
        }
      }
    }),
    Unocss()
  ]
});
