import { createVueWrapper } from '../create-wrapper.js';

export const CgRadio = createVueWrapper(
  'cg-radio',
  {
    label: { type: String, default: '' },
    description: { type: String, default: '' },
    name: { type: String, default: '' },
    value: { type: String, default: '' },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    'change': 'cg-change',
  }
);
