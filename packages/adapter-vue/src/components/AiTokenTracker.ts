import { createVueWrapper } from '../create-wrapper.js';

export const AiTokenTracker = createVueWrapper(
  'ai-token-tracker',
  {
    inputTokens: { type: [String, Array, Object, Number, Boolean] },
    outputTokens: { type: [String, Array, Object, Number, Boolean] },
    cost: { type: [String, Array, Object, Number, Boolean] },
    latency: { type: [String, Array, Object, Number, Boolean] },
    model: { type: [String, Array, Object, Number, Boolean] },
    budget: { type: [String, Array, Object, Number, Boolean] },
    mode: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
