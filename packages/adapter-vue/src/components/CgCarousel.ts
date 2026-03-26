import { createVueWrapper } from '../create-wrapper.js';

export const CgCarousel = createVueWrapper(
  'cg-carousel',
  {
    showDots: { type: Boolean, default: true },
    showArrows: { type: Boolean, default: true },
  },
  {}
);
