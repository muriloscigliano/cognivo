import { createWrapper } from '../create-wrapper.js';

export const AiActionReceipt = /* @__PURE__ */ createWrapper(
  'ai-action-receipt',
  ['summary', 'touched', 'status', 'error', 'compensationLabel'],
  {
    onActionCompensate: 'ai-action-compensate',
  }
);
