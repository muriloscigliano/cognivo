import { createVueWrapper } from '../create-wrapper.js';

export const CgSelect = createVueWrapper(
  'cg-select',
  {
    options: { type: Array, default: () => [] },
    value: { type: String, default: '' },
    placeholder: { type: String, default: 'Select...' },
    name: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
  },
  {
    'change': 'cg-change',
  }
);
