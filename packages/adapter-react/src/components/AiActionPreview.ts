import { createWrapper } from '../create-wrapper.js';
export const AiActionPreview = /* @__PURE__ */ createWrapper('ai-action-preview', ['title', 'description', 'action', 'severity', 'details', 'confirmLabel', 'cancelLabel', 'countdown'],
  {
    onActionConfirm: 'ai-action-confirm',
    onActionCancel: 'ai-action-cancel',
  }
);
