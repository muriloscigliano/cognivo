import { createWrapper } from '../create-wrapper.js';
export const AiAbTest = createWrapper('ai-ab-test', ['variantA', 'variantB', 'labelA', 'labelB', 'title'],
  {
    onAbVote: 'ai-ab-vote',
    onAbCompare: 'ai-ab-compare',
  }
);
