import {
  Highlighter,
  ILanguageRegistration,
  getHighlighter,
  loadTheme,
  setCDN,
  setWasm
} from 'shiki';

let highlighter: Highlighter | null = null;
// let languages: Record<string, ILanguageRegistration> = {};

// async function loadLang(lang: string) {
//   if (lang in languages) {
//     return languages[lang];
//   }
//   const syntax = (await import(`../assets/${lang}.tmLanguage.json`)).default;
//   console.log(syntax);

//   languages[lang] = syntax;
//   return languages[lang];
// }

async function setup() {
  if (!highlighter) {
    // base is root
    const base = '/';
    setCDN(base);
    setWasm(await fetch(base + `onig.wasm`).then((res) => res.arrayBuffer()));
    const theme = await loadTheme('themes/github-light.json');

    highlighter = await getHighlighter({
      theme,
      themes: [theme],
      langs: ['cpp']
    });
  }
}

export async function highlight(lang: string, code: string) {
  await setup();
  return highlighter!.codeToHtml(code, { lang });
}
