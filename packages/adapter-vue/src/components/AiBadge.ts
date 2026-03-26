import { createVueWrapper } from '../create-wrapper.js';

export const AiBadge = createVueWrapper(
  'ai-badge',
  {
    score: { type: Number, default: 0.85 },
    showPercentage: { type: Boolean, default: true },
  },
  {
    'badge-click': 'ai-badge-click',
  }
);
