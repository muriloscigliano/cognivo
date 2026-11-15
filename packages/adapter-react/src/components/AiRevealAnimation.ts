import { createWrapper } from '../create-wrapper.js';
export const AiRevealAnimation = createWrapper('ai-reveal-animation', ['type', 'delay', 'duration', 'visible'],
  {
    onRevealComplete: 'ai-reveal-complete',
  }
);
