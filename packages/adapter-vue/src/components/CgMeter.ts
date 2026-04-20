import { createVueWrapper } from '../create-wrapper.js';

export interface CgMeterProps {
  value?: number;
  min?: number;
  max?: number;
  low?: number | null;
  high?: number | null;
  optimum?: number | null;
  label?: string;
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export const CgMeter = createVueWrapper(
  'cg-meter',
  {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    low: { type: Number, default: null },
    high: { type: Number, default: null },
    optimum: { type: Number, default: null },
    label: { type: String, default: '' },
    variant: { type: String, default: 'linear' },
    size: { type: String, default: 'md' },
    showValue: { type: Boolean, default: false },
  },
  { showValue: 'show-value' }
);
