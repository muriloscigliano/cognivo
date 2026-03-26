import { createWrapper } from '../create-wrapper.js';
export const AiErrorBoundary = createWrapper('ai-error-boundary', ['error', 'code', 'retryable', 'details'], {});
