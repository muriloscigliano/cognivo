import { createWrapper } from '../create-wrapper.js';
export const AiWebhookConfig = /* @__PURE__ */ createWrapper('ai-webhook-config', ['webhooks', 'availableEvents'],
  {
    onWebhookCreate: 'ai-webhook-create',
    onWebhookToggle: 'ai-webhook-toggle',
    onWebhookDelete: 'ai-webhook-delete',
    onWebhookTest: 'ai-webhook-test',
  }
);
