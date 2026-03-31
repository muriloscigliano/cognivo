import { createWrapper } from '../create-wrapper.js';

export interface CgRadioGroupProps {
  /** Shared name for all child radios. */
  name?: string;
  /** Currently selected value. */
  value?: string;
  /** Accessible group label. */
  label?: string;
  /** Disables all child radios. */
  disabled?: boolean;
  /** Layout direction. */
  orientation?: 'vertical' | 'horizontal';
  /** Fired when the selected value changes. */
  onCgChange?: (e: CustomEvent<{ value: string }>) => void;
  className?: string;
}

export const CgRadioGroup = createWrapper<CgRadioGroupProps>(
  'cg-radio-group',
  ['name', 'value', 'label', 'disabled', 'orientation'],
  { onCgChange: 'cg-change' }
);
