import { createVueWrapper } from '../create-wrapper.js';

export const AiActionReceipt = createVueWrapper(
  'ai-action-receipt',
  {
    summary: { type: [String, Array, Object, Number, Boolean] },
    touched: { type: [String, Array, Object, Number, Boolean] },
    status: { type: [String, Array, Object, Number, Boolean] },
    error: { type: [String, Array, Object, Number, Boolean] },
    compensationLabel: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
