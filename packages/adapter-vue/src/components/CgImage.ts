import { createVueWrapper } from '../create-wrapper.js';

export const CgImage = createVueWrapper(
  'cg-image',
  {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    ratio: { type: String, default: 'auto' },
    fit: { type: String, default: 'cover' },
    lazy: { type: Boolean, default: true },
  },
  {}
);
