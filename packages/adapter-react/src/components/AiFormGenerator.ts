import { createWrapper } from '../create-wrapper.js';
export const AiFormGenerator = /* @__PURE__ */ createWrapper('ai-form-generator', ['schema', 'values', 'loading'],
  {
    onFormChange: 'ai-form-change',
    onFormValidate: 'ai-form-validate',
    onFormSubmit: 'ai-form-submit',
  }
);
