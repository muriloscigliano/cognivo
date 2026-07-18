import { createWrapper } from '../create-wrapper.js';

export const AiActionReceipt = createWrapper(
  'ai-action-receipt',
  ['summary', 'touched', 'status', 'error', 'compensationLabel'],
  {}
);
