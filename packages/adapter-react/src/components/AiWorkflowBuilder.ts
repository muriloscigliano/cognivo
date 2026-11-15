import { createWrapper } from '../create-wrapper.js';
export const AiWorkflowBuilder = createWrapper('ai-workflow-builder', ['steps', 'title'],
  {
    onWorkflowStepClick: 'ai-workflow-step-click',
  }
);
