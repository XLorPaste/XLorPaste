import { Highlighter, getHighlighter, loadTheme, setCDN, setWasm, Lang } from 'shiki';

const supportLangs: Lang[] = [
  'c',
  'cpp',
  'java',
  'javascript',
  'json',
  'python',
  'typescript',
  'yaml'
];

const alias: Map<string, Lang> = new Map([
  ['c++', 'cpp'],
  ['C++', 'cpp']
]);

let highlighter: Highlighter | null = null;

let mdRender: ((raw: string) => string) | null = null;

async function setup() {
  if (!highlighter) {
    // base is root
    const base = '/';
    setCDN(base);
    setWasm(await fetch(base + `onig.wasm`).then((res) => res.arrayBuffer()));
    const themes = [await loadTheme('themes/eva-light.json')];

    highlighter = await getHighlighter({
      themes,
      langs: supportLangs
    });
  }
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

export async function highlight(lang: string, code: string) {
  if (lang === 'text') {
    return `<pre class="shiki"><code>${escapeCode(code)
      .split('\n')
      .map((l) => `<span class="line">${l}</span>`)
      .join('\n')}</code></pre>`;
  } else if (lang === 'md') {
    if (!mdRender) {
      await setup();
      const { createMarkdown } = await import('./markdown');

      mdRender = createMarkdown({
        highlight: (code, lang) => {
          code = code.trim();
          lang = alias.get(lang) ?? lang;
          if (supportLangs.find((l) => l === lang)) {
            return highlighter!.codeToHtml(code, { lang });
          } else {
            return escapeCode(code);
          }
        }
      });
    }
    return `<div class="markdown-body">${mdRender(code)}</div>`;
  } else {
    await setup();
    return highlighter!.codeToHtml(code, { lang });
  }
}
