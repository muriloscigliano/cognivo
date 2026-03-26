import { createVueWrapper } from '../create-wrapper.js';

export const AiStreamingText = createVueWrapper(
  'ai-streaming-text',
  {
    content: { type: String, default: '' },
    streaming: { type: Boolean, default: false },
    showCursor: { type: Boolean, default: true },
    markdown: { type: Boolean, default: true },
  },
  {}
);
