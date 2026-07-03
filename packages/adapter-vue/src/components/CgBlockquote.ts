import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgBlockquote = createVueWrapper('cg-blockquote', {
  cite: T,
  variant: T,
}, {});
