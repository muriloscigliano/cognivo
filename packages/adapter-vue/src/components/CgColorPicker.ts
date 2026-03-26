import { createVueWrapper } from '../create-wrapper.js';
export const CgColorPicker = createVueWrapper('cg-color-picker', {
  value: { type: [String, Array, Object, Number, Boolean] },
  colors: { type: [String, Array, Object, Number, Boolean] },
  columns: { type: [String, Array, Object, Number, Boolean] },
  label: { type: [String, Array, Object, Number, Boolean] },
  allowCustom: { type: [String, Array, Object, Number, Boolean] },
}, {});
