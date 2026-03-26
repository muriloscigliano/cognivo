import { createVueWrapper } from '../create-wrapper.js';

export const CgButtonGroup = createVueWrapper(
  'cg-button-group',
  {
    direction: { type: String, default: 'row' },
    gap: { type: String, default: 'sm' },
    align: { type: String, default: 'start' },
    attached: { type: Boolean, default: false },
  },
  {}
);
