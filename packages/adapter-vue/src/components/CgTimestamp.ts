import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgTimestamp = createVueWrapper('cg-timestamp', {
  datetime: T,
  format: T,
  live: T,
}, {});
