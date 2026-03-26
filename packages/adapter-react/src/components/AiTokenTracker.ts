import { createWrapper } from '../create-wrapper.js';

export const AiTokenTracker = createWrapper(
  'ai-token-tracker',
  ['inputTokens', 'outputTokens', 'cost', 'latency', 'model', 'budget', 'mode'],
  {}
);
