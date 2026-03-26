import { createVueWrapper } from '../create-wrapper.js';
export const CgDrawer = createVueWrapper('cg-drawer', {
  open: { type: [String, Array, Object, Number, Boolean] },
  side: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  closable: { type: [String, Array, Object, Number, Boolean] },
  persistent: { type: [String, Array, Object, Number, Boolean] },
}, {});
