import { createVueWrapper } from '../create-wrapper.js';
export const AiValidationChecklist = createVueWrapper('ai-validation-checklist', {
  checks: { type: Array, default: () => [] },
  title: { type: String, default: 'Validation' },
  autoRun: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
}, {});
