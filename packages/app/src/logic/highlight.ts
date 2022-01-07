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
      langs: ['cpp']
    });
  }
}

export async function highlight(lang: string, code: string) {
  await setup();
  return highlighter!.codeToHtml(code, { lang });
}
