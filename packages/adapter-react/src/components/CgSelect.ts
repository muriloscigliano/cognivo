import { createWrapper } from '../create-wrapper.js';

export interface CgSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CgSelectProps {
  /** Available options. */
  options?: CgSelectOption[];
  /** Currently selected value. */
  value?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Form field name. */
  name?: string;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Error message or boolean. */
  error?: string | boolean;
  /** Whether the options are searchable. */
  searchable?: boolean;
  /** Visible label above the field. */
  label?: string;
  /** Accessible name when it should differ from the visible `label`; names
   *  the combobox and its listbox (`aria-label` works too). */
  accessibleLabel?: string;
  /** Fired when the selection changes. */
  onCgChange?: (e: CustomEvent<{ value: string }>) => void;
  className?: string;
}

export const CgSelect = createWrapper<CgSelectProps, 'cg-select'>(
  'cg-select',
  ['options', 'value', 'placeholder', 'name', 'disabled', 'error', 'searchable'],
  {
    onCgChange: 'cg-change',
  }
);
