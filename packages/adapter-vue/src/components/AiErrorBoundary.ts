import { createVueWrapper } from '../create-wrapper.js';
export const AiErrorBoundary = createVueWrapper('ai-error-boundary', {
  error: { type: [String, Array, Object, Number, Boolean] },
  code: { type: [String, Array, Object, Number, Boolean] },
  retryable: { type: [String, Array, Object, Number, Boolean] },
  details: { type: [String, Array, Object, Number, Boolean] },
}, {});
