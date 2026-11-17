import { createWrapper } from '../create-wrapper.js';
export const AiPromptTemplate = /* @__PURE__ */ createWrapper('ai-prompt-template', ['template', 'variables', 'editable'],
  {
    onTemplateChange: 'ai-template-change',
    onTemplateVariableChange: 'ai-template-variable-change',
  }
);
