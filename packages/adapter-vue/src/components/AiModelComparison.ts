import { createVueWrapper } from '../create-wrapper.js';
export const AiModelComparison = createVueWrapper('ai-model-comparison', {
  models: { type: [String, Array, Object, Number, Boolean] },
}, {});
