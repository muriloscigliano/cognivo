import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgTagInput = createVueWrapper('cg-tag-input', {
  value: T, label: T, placeholder: T, helper: T, name: T, delimiter: T, max: T, allowDuplicates: T, disabled: T, error: T, success: T,
}, {});
