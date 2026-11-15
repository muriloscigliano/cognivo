import { createWrapper } from '../create-wrapper.js';
export const AiSimilarityCard = createWrapper('ai-similarity-card', ['rounded', 'itemA', 'itemB', 'score', 'features', 'layout'],
  {
    onSimilarityReject: 'ai-similarity-reject',
    onSimilarityAccept: 'ai-similarity-accept',
  }
);
