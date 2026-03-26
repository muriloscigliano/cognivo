import { createVueWrapper } from '../create-wrapper.js';

export const AiTimeline = createVueWrapper(
  'ai-timeline',
  {
    steps: { type: [String, Array, Object, Number, Boolean] },
    compact: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
