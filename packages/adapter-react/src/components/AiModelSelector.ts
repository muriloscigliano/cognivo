import { createWrapper } from '../create-wrapper.js';

export const AiModelSelector = createWrapper(
  'ai-model-selector',
  ['models', 'selected', 'multi'],
  {}
);
