import { createVueWrapper } from '../create-wrapper.js';
export const AiVoicePanel = createVueWrapper('ai-voice-panel', {
  rounded: { type: String, default: 'lg' },
  language: { type: String, default: 'en-US' },
  pushToTalk: { type: Boolean, default: false },
  continuous: { type: Boolean, default: false },
  timeout: { type: Number, default: 10 },
}, {});
