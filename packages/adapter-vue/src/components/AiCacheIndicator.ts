import { createVueWrapper } from '../create-wrapper.js';
export const AiCacheIndicator = createVueWrapper('ai-cache-indicator', {
  status: { type: String, default: 'disabled' },
  hitRate: { type: Number, default: 0 },
  latencySaved: { type: String, default: '' },
  cacheAge: { type: String, default: '' },
  showDetails: { type: Boolean, default: false },
}, {});
