import { createWrapper } from '../create-wrapper.js';

export interface CgBadgeProps {
  /** Badge visual variant. */
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
  /** Badge size. */
  size?: 'sm' | 'md' | 'lg';
  /** Badge label text. */
  label?: string;
  /** Whether to show as a dot indicator. */
  dot?: boolean;
  className?: string;
}

export const CgBadge = createWrapper<CgBadgeProps>(
  'cg-badge',
  ['variant', 'size', 'label', 'dot'],
  {}
);
