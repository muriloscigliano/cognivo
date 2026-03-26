import { createVueWrapper } from '../create-wrapper.js';
export const CgModal = createVueWrapper('cg-modal', {
  open: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
  closable: { type: [String, Array, Object, Number, Boolean] },
  persistent: { type: [String, Array, Object, Number, Boolean] },
}, {});
