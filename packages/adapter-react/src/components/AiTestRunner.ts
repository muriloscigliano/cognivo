import { createWrapper } from '../create-wrapper.js';
export const AiTestRunner = /* @__PURE__ */ createWrapper('ai-test-runner', ['tests', 'title'],
  {
    onTestClick: 'ai-test-click',
    onTestRun: 'ai-test-run',
  }
);
