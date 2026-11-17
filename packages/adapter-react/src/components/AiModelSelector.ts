import { createWrapper } from '../create-wrapper.js';

export const AiModelSelector = /* @__PURE__ */ createWrapper(
  'ai-model-selector',
  ['models', 'selected', 'multi'],
  {
    onModelSelect: 'ai-model-select',
    onModelCompare: 'ai-model-compare',
  }
);
