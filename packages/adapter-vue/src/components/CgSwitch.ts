import { createVueWrapper } from '../create-wrapper.js';

export interface CgSwitchProps {
  label?: string;
  description?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
}

export const CgSwitch = createVueWrapper(
  'cg-switch',
  {
    label: { type: String, default: '' },
    description: { type: String, default: '' },
    name: { type: String, default: '' },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    'change': 'cg-change',
  }
);
