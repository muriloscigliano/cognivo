import { createVueWrapper } from '../create-wrapper.js';

export const AiDiffPanel = createVueWrapper(
  'ai-diff-panel',
  {
    before: { type: [String, Array, Object, Number, Boolean] },
    after: { type: [String, Array, Object, Number, Boolean] },
    mode: { type: [String, Array, Object, Number, Boolean] },
    title: { type: [String, Array, Object, Number, Boolean] },
    labels: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
