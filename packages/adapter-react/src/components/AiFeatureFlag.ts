import { createWrapper } from '../create-wrapper.js';
export const AiFeatureFlag = /* @__PURE__ */ createWrapper('ai-feature-flag', ['flags', 'environment'],
  {
    onFlagToggle: 'ai-flag-toggle',
    onFlagClick: 'ai-flag-click',
  }
);
