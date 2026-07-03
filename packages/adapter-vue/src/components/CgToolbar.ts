import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgToolbar = createVueWrapper('cg-toolbar', {
  label: T,
  orientation: T,
  size: T,
  wrap: T,
}, {});
