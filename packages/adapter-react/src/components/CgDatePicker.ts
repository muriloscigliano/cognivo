import { createWrapper } from '../create-wrapper.js';

export interface CgDatePickerProps {
  /** Currently selected date (ISO 8601 string). */
  value?: string;
  /** Form field name. */
  name?: string;
  /** Minimum selectable date (ISO 8601 string). */
  min?: string;
  /** Maximum selectable date (ISO 8601 string). */
  max?: string;
  /** Whether the date picker is disabled. */
  disabled?: boolean;
  /** Error message or boolean. */
  error?: string | boolean;
  /** Fired when the selected date changes. */
  onChange?: (e: CustomEvent<{ value: string }>) => void;
  className?: string;
}

export const CgDatePicker = createWrapper<CgDatePickerProps>(
  'cg-date-picker',
  ['value', 'name', 'min', 'max', 'disabled', 'error'],
  { onChange: 'cg-change' }
);
