import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgCollapsible = createVueWrapper('cg-collapsible', {
  open: T, disabled: T,
}, {});
