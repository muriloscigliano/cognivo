import { createWrapper } from '../create-wrapper.js';
export const AiProgressSteps = createWrapper('ai-progress-steps', ['phases', 'compact'],
  {
    onProgressPhaseClick: 'ai-progress-phase-click',
  }
);
