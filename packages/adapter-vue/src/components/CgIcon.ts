import { createVueWrapper } from '../create-wrapper.js';

export const CgIcon = createVueWrapper(
  'cg-icon',
  {
    name: { type: String, default: '' },
    size: { type: String, default: 'md' },
    color: { type: String, default: 'current' },
    label: { type: String, default: '' },
  },
  {}
);
