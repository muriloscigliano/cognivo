import { createWrapper } from '../create-wrapper.js';
export const AiSimilarityCard = /* @__PURE__ */ createWrapper('ai-similarity-card', ['rounded', 'itemA', 'itemB', 'score', 'features', 'layout'],
  {
    onSimilarityReject: 'ai-similarity-reject',
    onSimilarityAccept: 'ai-similarity-accept',
  }
);
