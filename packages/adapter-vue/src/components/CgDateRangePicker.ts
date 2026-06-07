import { createVueWrapper } from '../create-wrapper.js';

export interface CgDateRangePickerProps {
  label?: string;
  from?: string;
  to?: string;
  min?: string;
  max?: string;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  open?: boolean;
}

export const CgDateRangePicker = createVueWrapper(
  'cg-date-range-picker',
  {
    label: { type: String, default: '' },
    from: { type: String, default: '' },
    to: { type: String, default: '' },
    min: { type: String, default: '' },
    max: { type: String, default: '' },
    placeholder: { type: String, default: 'Select date range' },
    format: { type: String, default: 'MMM dd, yyyy' },
    disabled: { type: Boolean, default: false },
    open: { type: Boolean, default: false },
  },
  {
    'change': 'cg-date-range-change',
  }
);
