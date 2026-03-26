import { createVueWrapper } from '../create-wrapper.js';
export const AiAudioPlayer = createVueWrapper('ai-audio-player', {
  src: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  duration: { type: [String, Array, Object, Number, Boolean] },
}, {});
