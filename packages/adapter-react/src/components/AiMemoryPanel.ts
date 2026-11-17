import { createWrapper } from '../create-wrapper.js';
export const AiMemoryPanel = /* @__PURE__ */ createWrapper('ai-memory-panel', ['shortTerm', 'longTerm', 'searchable'],
  {
    onMemorySearch: 'ai-memory-search',
    onMemoryPin: 'ai-memory-pin',
    onMemoryDelete: 'ai-memory-delete',
  }
);
