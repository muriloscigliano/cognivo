import { createVueWrapper } from '../create-wrapper.js';
export const AiWebhookConfig = createVueWrapper('ai-webhook-config', {
  webhooks: { type: [String, Array, Object, Number, Boolean] },
  availableEvents: { type: [String, Array, Object, Number, Boolean] },
}, {});
