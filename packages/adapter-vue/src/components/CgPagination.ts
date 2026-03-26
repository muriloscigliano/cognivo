import { createVueWrapper } from '../create-wrapper.js';
export const CgPagination = createVueWrapper('cg-pagination', {
  total: { type: [String, Array, Object, Number, Boolean] },
  current: { type: [String, Array, Object, Number, Boolean] },
  siblings: { type: [String, Array, Object, Number, Boolean] },
  showFirst: { type: [String, Array, Object, Number, Boolean] },
  showLast: { type: [String, Array, Object, Number, Boolean] },
}, {});
