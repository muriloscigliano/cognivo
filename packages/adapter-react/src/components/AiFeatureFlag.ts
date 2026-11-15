import { createWrapper } from '../create-wrapper.js';
export const AiFeatureFlag = createWrapper('ai-feature-flag', ['flags', 'environment'],
  {
    onFlagToggle: 'ai-flag-toggle',
    onFlagClick: 'ai-flag-click',
  }
);
