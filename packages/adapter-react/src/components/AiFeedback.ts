import { createWrapper } from '../create-wrapper.js';

export const AiFeedback = createWrapper(
  'ai-feedback',
  ['mode', 'tags', 'messageId', 'showComment'],
  {}
);
