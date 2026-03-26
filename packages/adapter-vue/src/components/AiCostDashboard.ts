import { createVueWrapper } from '../create-wrapper.js';
export const AiCostDashboard = createVueWrapper('ai-cost-dashboard', {
  entries: { type: [String, Array, Object, Number, Boolean] },
  budget: { type: [String, Array, Object, Number, Boolean] },
  period: { type: [String, Array, Object, Number, Boolean] },
}, {});
