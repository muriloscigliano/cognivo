import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgHoverCard = createVueWrapper('cg-hover-card', {
  open: T, placement: T, offset: T, openDelay: T, closeDelay: T,
}, {});
