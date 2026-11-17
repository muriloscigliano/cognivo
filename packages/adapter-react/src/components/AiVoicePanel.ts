import { createWrapper } from '../create-wrapper.js';
export const AiVoicePanel = /* @__PURE__ */ createWrapper('ai-voice-panel', ['rounded', 'language', 'pushToTalk', 'continuous', 'timeout'],
  {
    onVoiceStart: 'ai-voice-start',
    onVoiceResult: 'ai-voice-result',
    onVoiceError: 'ai-voice-error',
    onVoiceStop: 'ai-voice-stop',
  }
);
