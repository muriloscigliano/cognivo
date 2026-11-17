import { createWrapper } from '../create-wrapper.js';
export const AiAudioPlayer = /* @__PURE__ */ createWrapper('ai-audio-player', ['src', 'title', 'duration'],
  {
    onAudioError: 'ai-audio-error',
    onAudioEnd: 'ai-audio-end',
    onAudioPause: 'ai-audio-pause',
    onAudioPlay: 'ai-audio-play',
  }
);
