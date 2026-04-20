import { createVueWrapper } from '../create-wrapper.js';
export const AiTransformSlider = createVueWrapper('ai-transform-slider', {
  rounded: { type: String, default: 'lg' },
  beforeSrc: { type: String, default: '' },
  afterSrc: { type: String, default: '' },
  beforeLabel: { type: String, default: 'Before' },
  afterLabel: { type: String, default: 'After' },
  position: { type: Number, default: 50 },
  orientation: { type: String, default: 'horizontal' },
}, {});
