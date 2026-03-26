import { createWrapper } from '../create-wrapper.js';

export interface CgBadgeProps {
  /** Badge visual variant. */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** Badge size. */
  size?: 'sm' | 'md' | 'lg';
  /** Badge label text. */
  label?: string;
  /** Whether to show as a dot indicator. */
  dot?: boolean;
  /** Whether the badge can be removed. */
  removable?: boolean;
  /** Fired when the remove button is clicked. */
  onRemove?: (e: CustomEvent) => void;
  className?: string;
}

export const CgBadge = createWrapper<CgBadgeProps>(
  'cg-badge',
  ['variant', 'size', 'label', 'dot', 'removable'],
  { onRemove: 'cg-badge-remove' }
);
