import { createVueWrapper } from '../create-wrapper.js';

export const CgSteps = createVueWrapper(
  'cg-steps',
  {
    items: { type: Array, default: () => [] },
    direction: { type: String, default: 'vertical' },
    clickable: { type: Boolean, default: false },
    compact: { type: Boolean, default: false },
  },
  {
    'step-click': 'cg-step-click',
  }
);
