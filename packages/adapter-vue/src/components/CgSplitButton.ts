import { createVueWrapper } from '../create-wrapper.js';
import type { SplitButtonItem } from '@cognivo/components/cg-split-button';

export type { SplitButtonItem };

export interface CgSplitButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  type?: 'normal' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  items?: SplitButtonItem[];
  open?: boolean;
  menuPlacement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

export const CgSplitButton = createVueWrapper(
  'cg-split-button',
  {
    label: { type: String, default: '' },
    variant: { type: String, default: 'primary' },
    size: { type: String, default: 'md' },
    type: { type: String, default: 'normal' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    open: { type: Boolean, default: false },
    menuPlacement: { type: String, default: 'bottom-end' },
  },
  {
    'cg-split-button-click': 'cg-split-button-click',
    'cg-split-button-select': 'cg-split-button-select',
    'cg-split-button-open': 'cg-split-button-open',
    'cg-split-button-close': 'cg-split-button-close',
  }
);
