import { createWrapper } from '../create-wrapper.js';

export interface CgDateRangePickerProps {
  /** Label text. */
  label?: string;
  /** Start date (ISO string). */
  from?: string;
  /** End date (ISO string). */
  to?: string;
  /** Minimum selectable date (ISO string). */
  min?: string;
  /** Maximum selectable date (ISO string). */
  max?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Date display format. */
  format?: string;
  /** Whether the picker is disabled. */
  disabled?: boolean;
  /** Whether the dropdown is open. */
  open?: boolean;
  /** Range change handler. */
  onCgDateRangeChange?: (e: CustomEvent<{ from: string; to: string }>) => void;
  className?: string;
}

export const CgDateRangePicker = createWrapper<CgDateRangePickerProps>(
  'cg-date-range-picker',
  ['label', 'from', 'to', 'min', 'max', 'placeholder', 'format', 'disabled', 'open'],
  {}
);
