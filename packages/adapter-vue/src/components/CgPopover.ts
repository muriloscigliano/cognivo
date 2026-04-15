import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgPopover = createVueWrapper('cg-popover', {
  open: T, placement: T, offset: T, arrow: T, trigger: T, closable: T, size: T, rounded: T,
}, {});
