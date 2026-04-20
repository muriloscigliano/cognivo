import { createVueWrapper } from '../create-wrapper.js';
export const AiPersonalizationDash = createVueWrapper('ai-personalization-dash', {
  rounded: { type: String, default: 'lg' },
  preferences: { type: Array, default: () => [] },
  segments: { type: Array, default: () => [] },
  userName: { type: String, default: '' },
  lastUpdated: { type: String, default: '' },
  showReset: { type: Boolean, default: false },
}, {});
