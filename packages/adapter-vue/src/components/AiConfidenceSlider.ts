import { createVueWrapper } from '../create-wrapper.js';
export const AiConfidenceSlider = createVueWrapper('ai-confidence-slider', {
  value: { type: [String, Array, Object, Number, Boolean] },
  min: { type: [String, Array, Object, Number, Boolean] },
  max: { type: [String, Array, Object, Number, Boolean] },
  resultCount: { type: [String, Array, Object, Number, Boolean] },
  totalCount: { type: [String, Array, Object, Number, Boolean] },
  distribution: { type: [String, Array, Object, Number, Boolean] },
}, {});
