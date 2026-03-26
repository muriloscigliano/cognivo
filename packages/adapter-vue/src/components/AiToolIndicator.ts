import { createVueWrapper } from '../create-wrapper.js';

export const AiToolIndicator = createVueWrapper(
  'ai-tool-indicator',
  {
    tools: { type: Array, default: () => [] },
    compact: { type: Boolean, default: false },
  },
  {}
);
