import { createVueWrapper } from '../create-wrapper.js';

export const CgMarkdown = createVueWrapper(
  'cg-markdown',
  {
    text: { type: String, default: '' },
  },
  {}
);
