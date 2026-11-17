import { createWrapper } from '../create-wrapper.js';

export const AiFeedback = /* @__PURE__ */ createWrapper(
  'ai-feedback',
  ['mode', 'tags', 'messageId', 'showComment'],
  {
    onFeedbackSubmit: 'ai-feedback-submit',
  }
);
