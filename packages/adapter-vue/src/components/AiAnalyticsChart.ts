import { createVueWrapper } from '../create-wrapper.js';
export const AiAnalyticsChart = createVueWrapper('ai-analytics-chart', {
  series: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  yLabel: { type: [String, Array, Object, Number, Boolean] },
  height: { type: [String, Array, Object, Number, Boolean] },
}, {});
