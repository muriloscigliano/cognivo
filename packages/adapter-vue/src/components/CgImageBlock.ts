import { createVueWrapper } from '../create-wrapper.js';

export const CgImageBlock = createVueWrapper(
  'cg-image-block',
  {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
    source: { type: String, default: '' },
    sourceUrl: { type: String, default: '' },
    ratio: { type: String, default: 'auto' },
    clickable: { type: Boolean, default: false },
  },
  {
    'image-click': 'cg-image-click',
  }
);
