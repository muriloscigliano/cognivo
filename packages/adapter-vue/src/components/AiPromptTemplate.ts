import { createVueWrapper } from '../create-wrapper.js';
export const AiPromptTemplate = createVueWrapper('ai-prompt-template', {
  template: { type: [String, Array, Object, Number, Boolean] },
  variables: { type: [String, Array, Object, Number, Boolean] },
  editable: { type: [String, Array, Object, Number, Boolean] },
}, {});
