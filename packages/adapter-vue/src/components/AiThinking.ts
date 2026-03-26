import { createVueWrapper } from '../create-wrapper.js';

export const AiThinking = createVueWrapper(
  'ai-thinking',
  {
    text: { type: String, default: 'Thinking' },
    shimmer: { type: Boolean, default: false },
  },
  {}
);
