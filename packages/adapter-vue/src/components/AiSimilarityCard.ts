import { createVueWrapper } from '../create-wrapper.js';
export const AiSimilarityCard = createVueWrapper('ai-similarity-card', {
  rounded: { type: String, default: 'lg' },
  itemA: { type: Object, default: () => ({ label: '' }) },
  itemB: { type: Object, default: () => ({ label: '' }) },
  score: { type: Number, default: 0 },
  features: { type: Array, default: () => [] },
  layout: { type: String, default: 'side-by-side' },
}, {});
