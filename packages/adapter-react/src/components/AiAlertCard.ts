import { createWrapper } from '../create-wrapper.js';
export const AiAlertCard = /* @__PURE__ */ createWrapper('ai-alert-card', ['title', 'message', 'urgency', 'deadline', 'actionLabel', 'dismissible'],
  {
    onAlertAction: 'ai-alert-action',
    onAlertDismiss: 'ai-alert-dismiss',
  }
);
