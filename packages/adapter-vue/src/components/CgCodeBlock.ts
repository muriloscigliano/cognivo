import { createVueWrapper } from '../create-wrapper.js';

export const CgCodeBlock = createVueWrapper(
  'cg-code-block',
  {
    code: { type: String, default: '' },
    language: { type: String, default: '' },
    filename: { type: String, default: '' },
    lineNumbers: { type: Boolean, default: false },
    wrap: { type: Boolean, default: false },
    collapsible: { type: Boolean, default: false },
  },
  {}
);
