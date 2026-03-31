import { createVueWrapper } from '../create-wrapper.js';

export interface CgSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CgSelectProps {
  options?: CgSelectOption[];
  value?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  searchable?: boolean;
}

export const CgSelect = createVueWrapper(
  'cg-select',
  {
    options: { type: Array, default: () => [] },
    value: { type: String, default: '' },
    placeholder: { type: String, default: 'Select...' },
    name: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
  },
  {
    'change': 'cg-change',
  }
);
