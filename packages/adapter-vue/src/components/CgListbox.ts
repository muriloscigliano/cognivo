import { createVueWrapper } from '../create-wrapper.js';
export const CgListbox = createVueWrapper('cg-listbox', {
  options: { type: Array, default: () => [] },
  value: { type: [String, Array], default: '' },
  multiple: { type: Boolean, default: false },
  checkPosition: { type: String, default: 'right' },
  label: { type: String, default: '' },
  emptyText: { type: String, default: 'No options' },
}, {});
