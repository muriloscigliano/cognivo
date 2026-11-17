import { createWrapper } from '../create-wrapper.js';
export const AiDetectionCanvas = /* @__PURE__ */ createWrapper('ai-detection-canvas', ['rounded', 'src', 'detections', 'showLabels', 'showConfidence', 'selectedId', 'interactive'],
  {
    onDetectionSelect: 'ai-detection-select',
    onDetectionHover: 'ai-detection-hover',
  }
);
