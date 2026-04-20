import { createVueWrapper } from '../create-wrapper.js';
export const AiConsentManager = createVueWrapper('ai-consent-manager', {
  consents: { type: Array, default: () => [] },
  rounded: { type: String, default: 'lg' },
  title: { type: String, default: 'Consent Settings' },
  acceptAllLabel: { type: String, default: 'Accept All' },
  rejectAllLabel: { type: String, default: 'Reject All' },
  saveLabel: { type: String, default: 'Save Preferences' },
}, {});
