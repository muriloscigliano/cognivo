import { createWrapper } from '../create-wrapper.js';
export const AiModelComparison = createWrapper('ai-model-comparison', ['models'],
  {
    onComparisonSelect: 'ai-comparison-select',
  }
);
