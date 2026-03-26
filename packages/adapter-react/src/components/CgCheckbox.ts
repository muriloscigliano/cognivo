import { createWrapper } from '../create-wrapper.js';

export interface CgCheckboxProps {
  /** Checkbox label text. */
  label?: string;
  /** Optional description below the label. */
  description?: string;
  /** Form field name. */
  name?: string;
  /** Checkbox value. */
  value?: string;
  /** Whether the checkbox is checked. */
  checked?: boolean;
  /** Whether the checkbox is in indeterminate state. */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Fired when the checked state changes. */
  onChange?: (e: CustomEvent<{ checked: boolean; value: string }>) => void;
  className?: string;
}

export const CgCheckbox = createWrapper<CgCheckboxProps>(
  'cg-checkbox',
  ['label', 'description', 'name', 'value', 'checked', 'indeterminate', 'disabled'],
  { onChange: 'cg-change' }
);
