import { createVueWrapper } from '../create-wrapper.js';
export const CgProgressBar = createVueWrapper('cg-progress-bar', {
  value: { type: [String, Array, Object, Number, Boolean] },
  label: { type: [String, Array, Object, Number, Boolean] },
  showValue: { type: [String, Array, Object, Number, Boolean] },
  variant: { type: [String, Array, Object, Number, Boolean] },
  indeterminate: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
  striped: { type: [String, Array, Object, Number, Boolean] },
  animated: { type: [String, Array, Object, Number, Boolean] },
}, {});
