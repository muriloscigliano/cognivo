import { createVueWrapper } from '../create-wrapper.js';
export const CgNumberInput = createVueWrapper('cg-number-input', {
  value: { type: [String, Array, Object, Number, Boolean] },
  min: { type: [String, Array, Object, Number, Boolean] },
  max: { type: [String, Array, Object, Number, Boolean] },
  step: { type: [String, Array, Object, Number, Boolean] },
  label: { type: [String, Array, Object, Number, Boolean] },
  disabled: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
}, {});
