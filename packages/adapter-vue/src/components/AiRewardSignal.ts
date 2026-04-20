import { createVueWrapper } from '../create-wrapper.js';
export const AiRewardSignal = createVueWrapper('ai-reward-signal', {
  rounded: { type: String, default: 'lg' },
  score: { type: Number, default: 0 },
  maxScore: { type: Number, default: 100 },
  trend: { type: String, default: 'stable' },
  history: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  description: { type: String, default: '' },
}, {});
