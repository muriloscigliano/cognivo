import { createVueWrapper } from '../create-wrapper.js';

export const CgBadge = createVueWrapper(
  'cg-badge',
  {
    variant: { type: String, default: 'neutral' },
    size: { type: String, default: 'md' },
    label: { type: String, default: '' },
    dot: { type: Boolean, default: false },
    removable: { type: Boolean, default: false },
  },
  {
    'remove': 'cg-badge-remove',
  }
);
