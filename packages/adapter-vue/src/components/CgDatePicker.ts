import { createVueWrapper } from '../create-wrapper.js';

export const CgDatePicker = createVueWrapper(
  'cg-date-picker',
  {
    value: { type: String, default: '' },
    name: { type: String, default: '' },
    min: { type: String, default: '' },
    max: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
  },
  {
    'change': 'cg-change',
  }
);
