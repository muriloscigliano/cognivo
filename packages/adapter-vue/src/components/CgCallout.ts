import { createVueWrapper } from '../create-wrapper.js';

export const CgCallout = createVueWrapper(
  'cg-callout',
  {
    variant: { type: String, default: 'info' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    dismissible: { type: Boolean, default: false },
  },
  {
    'dismiss': 'cg-callout-dismiss',
  }
);
