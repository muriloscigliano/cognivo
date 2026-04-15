import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgRating = createVueWrapper('cg-rating', {
  value: T, max: T, precision: T, readonly: T, disabled: T, size: T, name: T,
}, {});
