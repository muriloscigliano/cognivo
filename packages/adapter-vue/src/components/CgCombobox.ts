import { createVueWrapper } from '../create-wrapper.js';
const T = { type: [String, Array, Object, Number, Boolean] };
export const CgCombobox = createVueWrapper('cg-combobox', {
  options: T, value: T, multiple: T, placeholder: T, searchable: T, clearable: T, disabled: T, loading: T, name: T, open: T,
}, {});
