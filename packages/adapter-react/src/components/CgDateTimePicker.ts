import { createWrapper } from '../create-wrapper.js';

export interface CgDateTimePickerProps {
  label?: string;
  value?: string;
  placeholder?: string;
  helper?: string;
  min?: string;
  max?: string;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  /** Fired when the date/time value changes. */
  onChange?: (e: CustomEvent<{ value: string; date: string; time: string }>) => void;
  className?: string;
}

export const CgDateTimePicker = createWrapper<CgDateTimePickerProps>(
  'cg-date-time-picker',
  ['label', 'value', 'placeholder', 'helper', 'min', 'max', 'size', 'rounded', 'disabled', 'error'],
  { onChange: 'cg-change' }
);
