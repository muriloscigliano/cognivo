import { createVueWrapper } from '../create-wrapper.js';

export const CgLabel = createVueWrapper(
  'cg-label',
  {
    text: { type: String, default: '' },
    hint: { type: String, default: '' },
    error: { type: String, default: '' },
    htmlFor: { type: String, default: '' },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {}
);
