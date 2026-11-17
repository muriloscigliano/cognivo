import { createWrapper } from '../create-wrapper.js';
export const AiVersionSelector = /* @__PURE__ */ createWrapper('ai-version-selector', ['versions', 'selected'],
  {
    onVersionSelect: 'ai-version-select',
    onVersionRolloutChange: 'ai-version-rollout-change',
  }
);
