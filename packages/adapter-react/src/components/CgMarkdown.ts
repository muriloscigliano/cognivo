import { createWrapper } from '../create-wrapper.js';

export interface CgMarkdownProps {
  /** Markdown text to render. */
  text?: string;
  className?: string;
}

export const CgMarkdown = /* @__PURE__ */ createWrapper<CgMarkdownProps, 'cg-markdown'>(
  'cg-markdown',
  ['text'],
  {}
);
