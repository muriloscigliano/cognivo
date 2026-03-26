import { createVueWrapper } from '../create-wrapper.js';
export const CgOtpInput = createVueWrapper('cg-otp-input', {
  length: { type: [String, Array, Object, Number, Boolean] },
  value: { type: [String, Array, Object, Number, Boolean] },
  disabled: { type: [String, Array, Object, Number, Boolean] },
  error: { type: [String, Array, Object, Number, Boolean] },
  mask: { type: [String, Array, Object, Number, Boolean] },
}, {});
