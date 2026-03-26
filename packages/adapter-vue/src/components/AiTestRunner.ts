import { createVueWrapper } from '../create-wrapper.js';
export const AiTestRunner = createVueWrapper('ai-test-runner', {
  tests: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
}, {});
