import { createVueWrapper } from '../create-wrapper.js';
export const AiCollaborativeEditor = createVueWrapper('ai-collaborative-editor', {
  content: { type: [String, Array, Object, Number, Boolean] },
  cursors: { type: [String, Array, Object, Number, Boolean] },
  editable: { type: [String, Array, Object, Number, Boolean] },
  placeholder: { type: [String, Array, Object, Number, Boolean] },
}, {});
