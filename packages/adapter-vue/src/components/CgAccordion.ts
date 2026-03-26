import { createVueWrapper } from '../create-wrapper.js';

export const CgAccordion = createVueWrapper(
  'cg-accordion',
  {
    items: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: false },
    variant: { type: String, default: 'default' },
    defaultOpen: { type: Array, default: () => [] },
  },
  {
    'change': 'cg-accordion-change',
  }
);
