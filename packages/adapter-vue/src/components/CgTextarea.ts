import { createVueWrapper } from '../create-wrapper.js';

export const CgTextarea = createVueWrapper(
  'cg-textarea',
  {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    name: { type: String, default: '' },
    rows: { type: Number, default: 3 },
    maxlength: { type: Number, default: 0 },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    autoresize: { type: Boolean, default: false },
  },
  {
    'input': 'cg-input',
  }
);
