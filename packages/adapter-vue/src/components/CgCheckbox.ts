import { createVueWrapper } from '../create-wrapper.js';

export interface CgCheckboxProps {
  label?: string;
  description?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}

export const CgCheckbox = createVueWrapper(
  'cg-checkbox',
  {
    label: { type: String, default: '' },
    description: { type: String, default: '' },
    name: { type: String, default: '' },
    value: { type: String, default: '' },
    checked: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    'change': 'cg-change',
  }
);
