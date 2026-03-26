import { createVueWrapper } from '../create-wrapper.js';

export const CgButton = createVueWrapper(
  'cg-button',
  {
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    type: { type: String, default: 'normal' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
    label: { type: String, default: '' },
  },
  {}
);
