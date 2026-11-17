import { createWrapper } from '../create-wrapper.js';

export const AiTokenTracker = /* @__PURE__ */ createWrapper(
  'ai-token-tracker',
  ['inputTokens', 'outputTokens', 'cost', 'latency', 'model', 'budget', 'mode'],
  {
    onTokenClick: 'ai-token-click',
  }
);
