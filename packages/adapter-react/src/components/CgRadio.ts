import { createWrapper } from '../create-wrapper.js';

export interface CgRadioProps {
  /** Radio label text. */
  label?: string;
  /** Optional description below the label. */
  description?: string;
  /** Form field name (groups radios together). */
  name?: string;
  /** Radio value. */
  value?: string;
  /** Whether the radio is checked. */
  checked?: boolean;
  /** Whether the radio is disabled. */
  disabled?: boolean;
  /** Fired when the selection changes. */
  onChange?: (e: CustomEvent<{ value: string }>) => void;
  className?: string;
}

export const CgRadio = createWrapper<CgRadioProps>(
  'cg-radio',
  ['label', 'description', 'name', 'value', 'checked', 'disabled'],
  { onChange: 'cg-change' }
);
