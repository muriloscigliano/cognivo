import { createWrapper } from '../create-wrapper.js';

export interface BiasScarcityProps {
  /** Scarcity kind. */
  type?: 'time' | 'stock' | 'popularity';
  /** ISO timestamp deadline (for type="time"). */
  deadline?: string;
  /** Remaining stock / view count. */
  remaining?: number;
  /** Threshold at which the component escalates to "warning" styling. */
  threshold?: number;
  /** Pulse the indicator dot. */
  pulse?: boolean;
  className?: string;
}

export const BiasScarcity = createWrapper<BiasScarcityProps>(
  'bias-scarcity',
  ['type', 'deadline', 'remaining', 'threshold', 'pulse'],
  {}
);
