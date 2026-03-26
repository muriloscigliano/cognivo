import { createVueWrapper } from '../create-wrapper.js';

export const CgBadgeGroup = createVueWrapper(
  'cg-badge-group',
  {
    label: { type: String, default: '' },
    gap: { type: String, default: 'sm' },
    max: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  {}
);
