import { createWrapper } from '../create-wrapper.js';

export interface CgMetricCardProps {
  /** Metric title label. */
  title?: string;
  /** Metric display value. */
  value?: string | number;
  /** Change delta (e.g. '+12%' or '-5'). */
  delta?: string;
  /** Trend direction. */
  trend?: 'up' | 'down' | 'flat';
  className?: string;
  /** Fired as `cg-metric-click`. */
  onMetricClick?: (e: CustomEvent) => void;
}

export const CgMetricCard = /* @__PURE__ */ createWrapper<CgMetricCardProps, 'cg-metric-card'>(
  'cg-metric-card',
  ['title', 'value', 'delta', 'trend'],
  {
    onMetricClick: 'cg-metric-click',
  }
);
