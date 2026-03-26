import { createVueWrapper } from '../create-wrapper.js';

export const AiModelSelector = createVueWrapper(
  'ai-model-selector',
  {
    models: { type: [String, Array, Object, Number, Boolean] },
    selected: { type: [String, Array, Object, Number, Boolean] },
    multi: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
