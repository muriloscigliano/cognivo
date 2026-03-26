import { createWrapper } from '../create-wrapper.js';

export interface CgTextProps {
  /** Text content to render. */
  text?: string;
  /** Text size token. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /** Font weight. */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** Text color token. */
  color?: string;
  /** HTML element to render as. */
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div';
  /** Text alignment. */
  align?: 'left' | 'center' | 'right';
  /** Whether to truncate with ellipsis. */
  truncate?: boolean;
  /** Whether to render inline. */
  inline?: boolean;
  /** Max number of lines before clamping. */
  clamp?: number;
  className?: string;
}

export const CgText = createWrapper<CgTextProps>(
  'cg-text',
  ['text', 'size', 'weight', 'color', 'as', 'align', 'truncate', 'inline', 'clamp'],
  {}
);
