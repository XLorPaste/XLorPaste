import 'github-markdown-css';
import * as MarkdownIt from 'markdown-it';
// @ts-ignore
import MathPlugin from 'markdown-it-math';
import { createKatexRender } from './katex';

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

  const { inlineRenderer, blockRenderer } = createKatexRender();
  markdown.use(MathPlugin, {
    inlineOpen: '$',
    inlineClose: '$',
    blockOpen: '$$',
    blockClose: '$$',
    inlineRenderer,
    blockRenderer
  });

  return (raw: string) => {
    return markdown.render(raw);
  };
}
