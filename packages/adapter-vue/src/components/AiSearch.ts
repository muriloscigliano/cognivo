import { createVueWrapper } from '../create-wrapper.js';

export const AiSearch = createVueWrapper(
  'ai-search',
  {
    placeholder: { type: [String, Array, Object, Number, Boolean] },
    suggestions: { type: [String, Array, Object, Number, Boolean] },
    filters: { type: [String, Array, Object, Number, Boolean] },
    recentSearches: { type: [String, Array, Object, Number, Boolean] },
    results: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
