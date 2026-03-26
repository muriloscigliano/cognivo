import { createVueWrapper } from '../create-wrapper.js';

export const CgStack = createVueWrapper(
  'cg-stack',
  {
    direction: { type: String, default: 'column' },
    gap: { type: String, default: 'md' },
    align: { type: String, default: 'stretch' },
    justify: { type: String, default: 'start' },
    wrap: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
  },
  {}
);
