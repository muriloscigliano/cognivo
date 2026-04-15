import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgKbd = createVueWrapper('cg-kbd', {
  keys: T, size: T, variant: T,
}, {});
