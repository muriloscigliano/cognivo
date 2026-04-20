import { createVueWrapper } from '../create-wrapper.js';

export interface CgEmptyStateProps {
  variant?: 'default' | 'search' | 'error' | 'success' | 'info';
  title?: string;
  description?: string;
  icon?: string;
}

export const CgEmptyState = createVueWrapper(
  'cg-empty-state',
  {
    variant: { type: String, default: 'default' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: '' },
  },
  {}
);
