import { createWrapper } from '../create-wrapper.js';
export const AiTranslationPanel = createWrapper('ai-translation-panel', ['rounded', 'sourceText', 'targetText', 'sourceLang', 'targetLang', 'loading', 'confidence', 'alternatives'],
  {
    onTranslationRequest: 'ai-translation-request',
    onTranslationSelectAlt: 'ai-translation-select-alt',
    onTranslationCopy: 'ai-translation-copy',
  }
);
