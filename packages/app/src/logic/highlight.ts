import { Highlighter, getHighlighter, loadTheme, setCDN, setWasm, Lang, IShikiTheme } from 'shiki';

import type { CodeLanguageType } from '~/constant';

let highlighter: Highlighter | null = null;

const themes: IShikiTheme[] = [];

let mdRender: ((raw: string) => string) | null = null;

const supportLangs: Lang[] = [
  'c',
  'cpp',
  'java',
  'javascript',
  'json',
  'python',
  'typescript',
  'yaml',
  'html',
  'css'
];

const alias: Map<string, Lang> = new Map([
  ['c++', 'cpp'],
  ['C++', 'cpp'],
  ['C', 'c'],
  ['js', 'javascript'],
  ['ts', 'typescript'],
  ['py', 'python']
]);

function isLangSupport(lang: string): lang is Lang {
  return !!supportLangs.find((l) => l === lang);
}

async function setup(...langs: Lang[]) {
  if (!highlighter) {
    // base is root
    const base = '/';
    setCDN(base);
    setWasm(await fetch(base + `onig.wasm`).then((res) => res.arrayBuffer()));
    themes.push(await loadTheme('themes/eva-light.json'));
    themes.push(await loadTheme('themes/eva-dark.json'));

    return (highlighter = await getHighlighter({
      themes,
      langs
    }));
  } else {
    return (highlighter = await getHighlighter({
      themes,
      langs
    }));
  }
}

export async function preSetup() {
  await setup(supportLangs[0]);
  await Promise.all(supportLangs.slice(1).map((lang) => setup(lang)));
}

export function escapeCode(raw: string) {
  return raw.replace(/[<>"& ]/g, (match) => {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '&':
        return '&amp;';
      case ' ':
        return '&nbsp;';
      default:
        return '';
    }
  });
}

export async function highlight(code: string, lang: CodeLanguageType, isDark: boolean = false) {
  const renderText = () =>
    `<pre class="shiki"><code>${escapeCode(code)
      .split('\n')
      .map((l) => `<span class="line">${l}</span>`)
      .join('\n')}</code></pre>`;

  if (lang === 'text') {
    return renderText();
  } else if (lang === 'md') {
    if (!mdRender) {
      await preSetup();
      const hl = await setup(...supportLangs);
      const { createMarkdown } = await import('./markdown');

      mdRender = createMarkdown({
        highlight: (code, lang) => {
          code = code.trim();
          lang = alias.get(lang) ?? lang;
          if (isLangSupport(lang)) {
            return hl.codeToHtml(code, { lang });
          } else {
            return escapeCode(code);
          }
        }
      });
    }
    return `<div class="markdown-body">${mdRender(code)}</div>`;
  } else {
    if (isLangSupport(lang)) {
      return (await setup(lang)).codeToHtml(code, {
        lang,
        theme: isDark ? 'Eva Dark' : 'Eva Light'
      });
    } else {
      return renderText();
    }
  }
}
