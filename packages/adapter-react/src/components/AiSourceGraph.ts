import { createWrapper } from '../create-wrapper.js';
export const AiSourceGraph = createWrapper('ai-source-graph', ['sources', 'responseId'],
  {
    onSourceClick: 'ai-source-click',
  }
);
