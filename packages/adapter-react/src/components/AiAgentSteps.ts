import { createWrapper } from '../create-wrapper.js';
export const AiAgentSteps = createWrapper('ai-agent-steps', ['steps', 'contained'],
  {
    onStepClick: 'ai-step-click',
  }
);
