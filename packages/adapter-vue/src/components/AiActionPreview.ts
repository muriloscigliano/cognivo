import { createVueWrapper } from '../create-wrapper.js';
export const AiActionPreview = createVueWrapper('ai-action-preview', {
  title: { type: [String, Array, Object, Number, Boolean] },
  description: { type: [String, Array, Object, Number, Boolean] },
  action: { type: [String, Array, Object, Number, Boolean] },
  severity: { type: [String, Array, Object, Number, Boolean] },
  details: { type: [String, Array, Object, Number, Boolean] },
  confirmLabel: { type: [String, Array, Object, Number, Boolean] },
  cancelLabel: { type: [String, Array, Object, Number, Boolean] },
  countdown: { type: [String, Array, Object, Number, Boolean] },
}, {});
