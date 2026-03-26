import { createVueWrapper } from '../create-wrapper.js';

export const CgImageGallery = createVueWrapper(
  'cg-image-gallery',
  {
    images: { type: Array, default: () => [] },
    maxVisible: { type: Number, default: 5 },
  },
  {
    'gallery-click': 'cg-gallery-click',
  }
);
