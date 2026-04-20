import { createVueWrapper } from '../create-wrapper.js';
export const CgDateTimePicker = createVueWrapper('cg-date-time-picker', {
  label: { type: String, default: '' },
  value: { type: String, default: '' },
  placeholder: { type: String, default: 'Select date & time' },
  helper: { type: String, default: '' },
  min: { type: String, default: '' },
  max: { type: String, default: '' },
  size: { type: String, default: 'md' },
  rounded: { type: String, default: 'lg' },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
}, {});
