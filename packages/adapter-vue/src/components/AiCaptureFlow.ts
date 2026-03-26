import { createVueWrapper } from '../create-wrapper.js';
export const AiCaptureFlow = createVueWrapper('ai-capture-flow', {
  step: { type: [String, Array, Object, Number, Boolean] },
  accept: { type: [String, Array, Object, Number, Boolean] },
  previewUrl: { type: [String, Array, Object, Number, Boolean] },
  result: { type: [String, Array, Object, Number, Boolean] },
  progress: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
}, {});
