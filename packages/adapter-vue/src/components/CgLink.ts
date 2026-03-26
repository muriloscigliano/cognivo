import { createVueWrapper } from '../create-wrapper.js';
export const CgLink = createVueWrapper('cg-link', {
  href: { type: [String, Array, Object, Number, Boolean] },
  variant: { type: [String, Array, Object, Number, Boolean] },
  external: { type: [String, Array, Object, Number, Boolean] },
  disabled: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
}, {});
