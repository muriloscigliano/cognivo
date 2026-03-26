import { createVueWrapper } from '../create-wrapper.js';
export const CgDropdown = createVueWrapper('cg-dropdown', {
  open: { type: [String, Array, Object, Number, Boolean] },
  position: { type: [String, Array, Object, Number, Boolean] },
  items: { type: [String, Array, Object, Number, Boolean] },
}, {});
