import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgThumbnail = createVueWrapper('cg-thumbnail', {
  alt: T,
  disabled: T,
  rounded: T,
  selectable: T,
  selected: T,
  size: T,
  src: T,
}, { 'select': 'cg-thumbnail-select' });
