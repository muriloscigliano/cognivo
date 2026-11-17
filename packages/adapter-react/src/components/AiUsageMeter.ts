import { createWrapper } from '../create-wrapper.js';
export const AiUsageMeter = /* @__PURE__ */ createWrapper('ai-usage-meter', ['used', 'limit', 'label', 'unit', 'resetDate'],
  {
    onUsageThreshold: 'ai-usage-threshold',
  }
);
