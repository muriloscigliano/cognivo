import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgLightbox = createVueWrapper('cg-lightbox', {
  closable: T,
  images: T,
  index: T,
  open: T,
}, { 'change': 'cg-lightbox-change', 'close': 'cg-lightbox-close', 'open': 'cg-lightbox-open' });
