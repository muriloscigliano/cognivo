import { createWrapper } from '../create-wrapper.js';
export const AiConsentManager = createWrapper('ai-consent-manager', ['consents', 'rounded', 'title', 'acceptAllLabel', 'rejectAllLabel', 'saveLabel'],
  {
    onConsentChange: 'ai-consent-change',
    onConsentSave: 'ai-consent-save',
  }
);
