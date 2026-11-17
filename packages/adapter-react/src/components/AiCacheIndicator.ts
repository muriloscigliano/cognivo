import { createWrapper } from '../create-wrapper.js';
export const AiCacheIndicator = /* @__PURE__ */ createWrapper('ai-cache-indicator', ['status', 'hitRate', 'latencySaved', 'cacheAge', 'showDetails'],
  {
    onCacheDetail: 'ai-cache-detail',
    onCacheClear: 'ai-cache-clear',
  }
);
