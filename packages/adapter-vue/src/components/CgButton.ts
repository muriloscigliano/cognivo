import { createVueWrapper } from '../create-wrapper.js';

export interface CgButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  label?: string;
}

export const CgButton = createVueWrapper(
  'cg-button',
  {
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    type: { type: String, default: 'normal' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
    label: { type: String, default: '' },
  },
  {}
);
