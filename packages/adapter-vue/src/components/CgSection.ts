import { createVueWrapper } from '../create-wrapper.js';

export const CgSection = createVueWrapper(
  'cg-section',
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    foldable: { type: Boolean, default: true },
    open: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    count: { type: Number, default: 0 },
  },
  {
    'toggle': 'cg-section-toggle',
  }
);
