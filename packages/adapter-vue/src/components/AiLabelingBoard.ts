import { createVueWrapper } from '../create-wrapper.js';
export const AiLabelingBoard = createVueWrapper('ai-labeling-board', {
  items: { type: Array, default: () => [] },
  labels: { type: Array, default: () => [] },
  allowCustomLabels: { type: Boolean, default: false },
  mode: { type: String, default: 'list' },
}, {});
