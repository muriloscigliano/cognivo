import { createWrapper } from '../create-wrapper.js';
export const AiRagPanel = /* @__PURE__ */ createWrapper('ai-rag-panel', ['documents', 'query', 'sortBy'],
  {
    onRagDocumentClick: 'ai-rag-document-click',
  }
);
