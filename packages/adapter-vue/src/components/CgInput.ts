import { createVueWrapper } from '../create-wrapper.js';

export const CgInput = createVueWrapper(
  'cg-input',
  {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    name: { type: String, default: '' },
    type: { type: String, default: 'text' },
    size: { type: String, default: 'md' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    maxlength: { type: Number, default: 0 },
  },
  {
    'input': 'cg-input',
    'clear': 'cg-clear',
  }
);
