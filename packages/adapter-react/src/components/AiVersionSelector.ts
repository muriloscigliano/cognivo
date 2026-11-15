import { createWrapper } from '../create-wrapper.js';
export const AiVersionSelector = createWrapper('ai-version-selector', ['versions', 'selected'],
  {
    onVersionSelect: 'ai-version-select',
    onVersionRolloutChange: 'ai-version-rollout-change',
  }
);
