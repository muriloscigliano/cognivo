import { createVueWrapper } from '../create-wrapper.js';
export const AiUsageMeter = createVueWrapper('ai-usage-meter', {
  used: { type: [String, Array, Object, Number, Boolean] },
  limit: { type: [String, Array, Object, Number, Boolean] },
  label: { type: [String, Array, Object, Number, Boolean] },
  unit: { type: [String, Array, Object, Number, Boolean] },
  resetDate: { type: [String, Array, Object, Number, Boolean] },
}, {});
