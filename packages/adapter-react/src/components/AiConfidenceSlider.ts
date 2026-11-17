import { createWrapper } from '../create-wrapper.js';
export const AiConfidenceSlider = /* @__PURE__ */ createWrapper('ai-confidence-slider', ['value', 'min', 'max', 'resultCount', 'totalCount', 'distribution'],
  {
    onConfidenceChange: 'ai-confidence-change',
  }
);
