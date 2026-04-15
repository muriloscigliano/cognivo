import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgPasswordInput = createVueWrapper('cg-password-input', {
  value: T, label: T, placeholder: T, helper: T, name: T, required: T, disabled: T, error: T, success: T, showStrength: T, minLength: T,
}, {});
