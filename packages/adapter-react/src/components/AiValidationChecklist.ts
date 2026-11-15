import { createWrapper } from '../create-wrapper.js';
export const AiValidationChecklist = createWrapper('ai-validation-checklist', ['checks', 'title', 'autoRun', 'loading'],
  {
    onValidationRun: 'ai-validation-run',
    onValidationItemClick: 'ai-validation-item-click',
  }
);
