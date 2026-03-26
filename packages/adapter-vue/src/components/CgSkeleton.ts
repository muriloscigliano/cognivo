import { createVueWrapper } from '../create-wrapper.js';
export const CgSkeleton = createVueWrapper('cg-skeleton', {
  variant: { type: [String, Array, Object, Number, Boolean] },
  width: { type: [String, Array, Object, Number, Boolean] },
  height: { type: [String, Array, Object, Number, Boolean] },
  lines: { type: [String, Array, Object, Number, Boolean] },
  animated: { type: [String, Array, Object, Number, Boolean] },
}, {});
