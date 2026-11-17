import { createWrapper } from '../create-wrapper.js';
export const AiScenarioPanel = /* @__PURE__ */ createWrapper('ai-scenario-panel', ['scenarios', 'activeScenario', 'loading'],
  {
    onScenarioSelect: 'ai-scenario-select',
  }
);
