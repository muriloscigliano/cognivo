import { createWrapper } from '../create-wrapper.js';

export interface CgMeterProps {
  /** Current value. */
  value?: number;
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Low threshold. */
  low?: number;
  /** High threshold. */
  high?: number;
  /** Optimum value. */
  optimum?: number;
  /** Accessible label. */
  label?: string;
  /** Display variant. */
  variant?: 'linear' | 'circular';
  /** Size variant. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the percentage value. */
  showValue?: boolean;
  className?: string;
}

export const CgMeter = createWrapper<CgMeterProps>(
  'cg-meter',
  ['value', 'min', 'max', 'low', 'high', 'optimum', 'label', 'variant', 'size', 'showValue'],
  { showValue: 'show-value' }
);
