import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgContextMenu = createVueWrapper('cg-context-menu', {
  open: T, items: T, disabled: T,
}, {});
