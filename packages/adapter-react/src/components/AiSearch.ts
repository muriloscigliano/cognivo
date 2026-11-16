import { createWrapper } from '../create-wrapper.js';

export const AiSearch = createWrapper(
  'ai-search',
  ['placeholder', 'suggestions', 'filters', 'recentSearches', 'results'],
  {
    onQuery: 'ai-search-query',
    onSearchSelect: 'ai-search-select',
    onFilter: 'ai-search-filter',
  }
);
