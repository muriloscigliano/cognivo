import { createWrapper } from '../create-wrapper.js';

export interface CgEmptyStateProps {
  /** Visual variant with contextual icon. */
  variant?: 'default' | 'search' | 'error' | 'success' | 'info';
  /** Title text. */
  title?: string;
  /** Description text. */
  description?: string;
  /** Custom icon name override. */
  icon?: string;
  className?: string;
}

export const CgEmptyState = createWrapper<CgEmptyStateProps>(
  'cg-empty-state',
  ['variant', 'title', 'description', 'icon'],
  {}
);
