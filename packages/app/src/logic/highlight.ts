import { createHighlighter, Highlighter, LanguageInput } from 'shiki';

// @ts-ignore
import EvaDark from '../assets/themes/eva-dark.jsonc';
// @ts-ignore
import EvaLight from '../assets/themes/eva-light.jsonc';

import type { CodeLanguageType } from '~/constant';

let highlighter: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

let mdRender: ((raw: string) => string) | null = null;

const supportLangs: string[] = [
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

const bundled: Map<string, LanguageInput> = new Map([
  ['c', () => import('shiki/langs/c.mjs'),],
  ['cpp', () => import('shiki/langs/cpp.mjs'),],
  ['java', () => import('shiki/langs/java.mjs'),],
  ['javascript', () => import('shiki/langs/javascript.mjs'),],
  ['typescript', () => import('shiki/langs/typescript.mjs'),],
  ['json', () => import('shiki/langs/json.mjs'),],
  ['python', () => import('shiki/langs/python.mjs'),],
  ['typescript', () => import('shiki/langs/typescript.mjs'),],
  ['yaml', () => import('shiki/langs/yaml.mjs'),],
  ['html', () => import('shiki/langs/html.mjs'),],
  ['css', () => import('shiki/langs/css.mjs'),],
])


const alias: Map<string, string> = new Map([
  ['c++', 'cpp'],
  ['C++', 'cpp'],
  ['C', 'c'],
  ['js', 'javascript'],
  ['ts', 'typescript'],
  ['py', 'python']
]);

function isLangSupport(lang: string) {
  return !!supportLangs.find((l) => l === lang);
}

async function setup(...langs: string[]) {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      return highlighter = await createHighlighter({
        langs: [
          ...langs.map(l => bundled.get(l)!).filter(Boolean)
        ],
        // @ts-ignore
        themes: [EvaLight, EvaDark]
      })
    })()
  }
  const hl = await highlighterPromise;
  hl.loadLanguage(...langs.map(l => bundled.get(l)!).filter(Boolean))
  return hl;
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
            return hl.codeToHtml(code, { lang, theme: isDark ? 'Eva Dark' : 'Eva Light' });
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
