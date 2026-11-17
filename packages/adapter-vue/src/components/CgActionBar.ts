import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgActionBar = createVueWrapper('cg-action-bar', {
  status: T,
}, {});
