import { createVueWrapper } from '../create-wrapper.js';
export const AiDetectionCanvas = createVueWrapper('ai-detection-canvas', {
  rounded: { type: String, default: 'lg' },
  src: { type: String, default: '' },
  detections: { type: Array, default: () => [] },
  showLabels: { type: Boolean, default: true },
  showConfidence: { type: Boolean, default: true },
  selectedId: { type: String, default: '' },
  interactive: { type: Boolean, default: true },
}, {});
