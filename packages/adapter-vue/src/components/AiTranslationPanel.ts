import { createVueWrapper } from '../create-wrapper.js';
export const AiTranslationPanel = createVueWrapper('ai-translation-panel', {
  rounded: { type: String, default: 'lg' },
  sourceText: { type: String, default: '' },
  targetText: { type: String, default: '' },
  sourceLang: { type: String, default: 'en' },
  targetLang: { type: String, default: 'es' },
  loading: { type: Boolean, default: false },
  confidence: { type: Number, default: 0 },
  alternatives: { type: Array, default: () => [] },
}, {});
