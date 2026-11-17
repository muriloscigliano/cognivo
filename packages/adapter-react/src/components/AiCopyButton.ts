import { createWrapper } from '../create-wrapper.js';
export const AiCopyButton = /* @__PURE__ */ createWrapper('ai-copy-button', ['value', 'label', 'variant', 'timeout'],
  {
    onCopySuccess: 'ai-copy-success',
    onCopyError: 'ai-copy-error',
  }
);
