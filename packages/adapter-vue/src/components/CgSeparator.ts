import { createVueWrapper } from '../create-wrapper.js';

export const CgSeparator = createVueWrapper(
  'cg-separator',
  {
    orientation: { type: String, default: 'horizontal' },
    label: { type: String, default: '' },
    spacing: { type: String, default: 'none' },
  },
  {}
);
