import { createWrapper } from '../create-wrapper.js';

export interface CgSeparatorProps {
  /** Separator orientation. */
  orientation?: 'horizontal' | 'vertical';
  /** Optional label text displayed in the separator. */
  label?: string;
  /** Spacing around the separator. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const CgSeparator = createWrapper<CgSeparatorProps>(
  'cg-separator',
  ['orientation', 'label', 'spacing'],
  {}
);
