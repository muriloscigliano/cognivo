import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgFileInput = createVueWrapper('cg-file-input', {
  label: T, placeholder: T, helper: T, accept: T, name: T, multiple: T, maxSize: T, maxFiles: T, disabled: T, error: T, success: T,
}, {});
