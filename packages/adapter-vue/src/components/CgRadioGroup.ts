import { createVueWrapper } from '../create-wrapper.js';

export interface CgRadioGroupProps {
  name?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export const CgRadioGroup = createVueWrapper(
  'cg-radio-group',
  {
    name: { type: String, default: '' },
    value: { type: String, default: '' },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    orientation: { type: String, default: 'vertical' },
  },
  {
    'change': 'cg-change',
  }
);
