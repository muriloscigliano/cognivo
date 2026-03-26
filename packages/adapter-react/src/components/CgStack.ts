import { createWrapper } from '../create-wrapper.js';

export interface CgStackProps {
  /** Stack direction: row or column. */
  direction?: 'row' | 'column';
  /** Spacing between children. */
  gap?: string;
  /** Cross-axis alignment. */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Main-axis alignment. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Whether children should wrap. */
  wrap?: boolean;
  /** Whether the stack takes full width. */
  full?: boolean;
  className?: string;
}

export const CgStack = createWrapper<CgStackProps>(
  'cg-stack',
  ['direction', 'gap', 'align', 'justify', 'wrap', 'full'],
  {}
);
