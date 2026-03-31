import { createVueWrapper } from '../create-wrapper.js';

export interface CgChipProps {
  label?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  removable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  disabled?: boolean;
}

export const CgChip = createVueWrapper('cg-chip', {
  label: { type: [String, Array, Object, Number, Boolean] },
  variant: { type: [String, Array, Object, Number, Boolean] },
  removable: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
  icon: { type: [String, Array, Object, Number, Boolean] },
  disabled: { type: [String, Array, Object, Number, Boolean] },
}, {});
