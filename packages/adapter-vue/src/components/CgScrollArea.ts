import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgScrollArea = createVueWrapper('cg-scroll-area', {
  orientation: T, type: T,
}, {});
