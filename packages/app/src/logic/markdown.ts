import 'github-markdown-css';
import * as MarkdownIt from 'markdown-it';
import mathPlugin from './katex';

interface MarkdownItOption {
  highlight?: (code: string, lang: string) => string;
}

export function createMarkdown(options: MarkdownItOption = {}) {
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: options.highlight
  });
  markdown.use(mathPlugin);

  return (raw: string) => {
    return markdown.render(raw);
  };
}
