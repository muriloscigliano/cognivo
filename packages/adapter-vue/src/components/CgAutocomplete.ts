import { createVueWrapper } from '../create-wrapper.js';
export const CgAutocomplete = createVueWrapper('cg-autocomplete', {
  options: { type: [String, Array, Object, Number, Boolean] },
  value: { type: [String, Array, Object, Number, Boolean] },
  placeholder: { type: [String, Array, Object, Number, Boolean] },
  label: { type: [String, Array, Object, Number, Boolean] },
  disabled: { type: [String, Array, Object, Number, Boolean] },
  clearable: { type: [String, Array, Object, Number, Boolean] },
}, {});
