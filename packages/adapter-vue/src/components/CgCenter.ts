import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgCenter = createVueWrapper('cg-center', {
  full: T,
  gap: T,
  inline: T,
  maxWidth: T,
}, {});
