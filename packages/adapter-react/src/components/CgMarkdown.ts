import { createWrapper } from '../create-wrapper.js';

export interface CgMarkdownProps {
  /** Markdown text to render. */
  text?: string;
  className?: string;
}

export const CgMarkdown = createWrapper<CgMarkdownProps>(
  'cg-markdown',
  ['text'],
  {}
);
