import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgStatusDot = createVueWrapper('cg-status-dot', {
  label: T,
  pulse: T,
  size: T,
  status: T,
}, {});
