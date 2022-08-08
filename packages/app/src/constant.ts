export const CodeLanguage = {
  text: '纯文本',
  cpp: 'C++',
  md: 'Markdown',
  c: 'C',
  java: 'Java',
  python: 'Python',
  javascript: 'JavaScript',
  json: 'JSON',
  yaml: 'Yaml',
  html: 'HTML',
  css: 'CSS'
};

export type CodeLanguageType = keyof typeof CodeLanguage;
