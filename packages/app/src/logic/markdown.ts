import * as MarkdownIt from 'markdown-it';
import 'github-markdown-css';

export function createMarkdown() {
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  return (raw: string) => {
    return markdown.render(raw);
  };
}
