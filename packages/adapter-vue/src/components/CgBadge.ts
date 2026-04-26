import { createVueWrapper } from '../create-wrapper.js';

export interface CgBadgeProps {
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  dot?: boolean;
}

export const CgBadge = createVueWrapper(
  'cg-badge',
  {
    variant: { type: String, default: 'neutral' },
    size: { type: String, default: 'md' },
    label: { type: String, default: '' },
    dot: { type: Boolean, default: false },
  },
  {}
);
