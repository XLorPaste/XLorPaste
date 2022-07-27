import { readFileSync } from 'node:fs';

import { defineConfig, Plugin } from 'vite';
import Vue from '@vitejs/plugin-vue';

import Info from 'vite-plugin-info';
import Unocss from 'unocss/vite';
import Markdown from 'vite-plugin-md';

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
  plugins: [Vue({ include: [/\.vue$/, /\.md$/] }), mdPlugin, Info(), Unocss()]
});
