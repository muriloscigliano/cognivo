import { createVueWrapper } from '../create-wrapper.js';

export const AiConfidenceBadge = createVueWrapper(
  'ai-confidence-badge',
  {
    score: { type: Number, default: 0.85 },
    showPercentage: { type: Boolean, default: true },
  },
  {
    'badge-click': 'ai-confidence-badge-click',
  }
);
