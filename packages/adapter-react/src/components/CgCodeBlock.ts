import { createWrapper } from '../create-wrapper.js';

export interface CgCodeBlockProps {
  /** Code content to display. */
  code?: string;
  /** Programming language for syntax highlighting. */
  language?: string;
  /** Optional filename shown in the header. */
  filename?: string;
  /** Whether to show line numbers. */
  lineNumbers?: boolean;
  /** Whether to wrap long lines. */
  wrap?: boolean;
  /** Whether the code block can be collapsed. */
  collapsible?: boolean;
  className?: string;
}

export const CgCodeBlock = createWrapper<CgCodeBlockProps>(
  'cg-code-block',
  ['code', 'language', 'filename', 'lineNumbers', 'wrap', 'collapsible'],
  {}
);
