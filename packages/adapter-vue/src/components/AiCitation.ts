import { createVueWrapper } from '../create-wrapper.js';

export const AiCitation = createVueWrapper(
  'ai-citation',
  {
    sources: { type: Array, default: () => [] },
    mode: { type: String, default: 'inline' },
    maxVisible: { type: Number, default: 5 },
  },
  {}
);
