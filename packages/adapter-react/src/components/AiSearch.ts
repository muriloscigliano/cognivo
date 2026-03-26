import { createWrapper } from '../create-wrapper.js';

export const AiSearch = createWrapper(
  'ai-search',
  ['placeholder', 'suggestions', 'filters', 'recentSearches', 'results'],
  {}
);
