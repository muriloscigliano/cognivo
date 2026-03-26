import { createVueWrapper } from '../create-wrapper.js';

export const CgSwitch = createVueWrapper(
  'cg-switch',
  {
    label: { type: String, default: '' },
    description: { type: String, default: '' },
    name: { type: String, default: '' },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    'change': 'cg-change',
  }
);
