import { createVueWrapper } from '../create-wrapper.js';

export const CgMetricCard = createVueWrapper(
  'cg-metric-card',
  {
    title: { type: String, default: '' },
    value: { type: String, default: '' },
    delta: { type: String, default: '' },
    trend: { type: String, default: 'neutral' },
  },
  {}
);
