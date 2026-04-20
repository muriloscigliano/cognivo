import { createVueWrapper } from '../create-wrapper.js';
export const CgTimePicker = createVueWrapper('cg-time-picker', {
  label: { type: String, default: '' },
  value: { type: String, default: '' },
  placeholder: { type: String, default: 'Select time' },
  name: { type: String, default: '' },
  helper: { type: String, default: '' },
  size: { type: String, default: 'md' },
  rounded: { type: String, default: 'lg' },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  success: { type: Boolean, default: false },
}, {});
