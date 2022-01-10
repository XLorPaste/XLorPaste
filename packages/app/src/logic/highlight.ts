import { Highlighter, getHighlighter, loadTheme, setCDN, setWasm } from 'shiki';

let highlighter: Highlighter | null = null;

async function setup() {
  if (!highlighter) {
    // base is root
    const base = '/';
    setCDN(base);
    setWasm(await fetch(base + `onig.wasm`).then((res) => res.arrayBuffer()));
    const themes = [await loadTheme('themes/eva-light.json')];

    highlighter = await getHighlighter({
      themes,
      langs: ['c', 'cpp', 'java', 'javascript', 'json', 'python', 'typescript', 'yaml']
    });
  }
}

export async function highlight(lang: string, code: string) {
  if (lang === 'text') {
    const lines = code
      .replace(/[<>"& ]/g, (match) => {
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
      })
      .split('\n');
    return `<pre class="shiki"><code>${lines
      .map((l) => `<span class="line">${l}</span>`)
      .join('\n')}</code></pre>`;
  } else {
    await setup();
    return highlighter!.codeToHtml(code, { lang });
  }
}
