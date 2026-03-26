import { createVueWrapper } from '../create-wrapper.js';

export const AiPromptEditor = createVueWrapper(
  'ai-prompt-editor',
  {
    versions: { type: [String, Array, Object, Number, Boolean] },
    editable: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
