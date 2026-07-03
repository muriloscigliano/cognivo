import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgGrid = createVueWrapper('cg-grid', {
  align: T,
  columns: T,
  full: T,
  gap: T,
  justify: T,
  minColumn: T,
}, {});
