import { createVueWrapper } from '../create-wrapper.js';
export const AiScenarioPanel = createVueWrapper('ai-scenario-panel', {
  scenarios: { type: Array, default: () => [] },
  activeScenario: { type: String, default: '' },
  loading: { type: Boolean, default: false },
}, {});
