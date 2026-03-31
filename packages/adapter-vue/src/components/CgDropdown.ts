import { createVueWrapper } from '../create-wrapper.js';

export interface CgDropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: string;
}

export interface CgDropdownProps {
  open?: boolean;
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  items?: CgDropdownItem[];
}

export const CgDropdown = createVueWrapper('cg-dropdown', {
  open: { type: [String, Array, Object, Number, Boolean] },
  position: { type: [String, Array, Object, Number, Boolean] },
  items: { type: [String, Array, Object, Number, Boolean] },
}, {});
