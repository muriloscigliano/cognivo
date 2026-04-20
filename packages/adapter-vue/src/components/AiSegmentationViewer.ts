import { createVueWrapper } from '../create-wrapper.js';
export const AiSegmentationViewer = createVueWrapper('ai-segmentation-viewer', {
  rounded: { type: String, default: 'lg' },
  src: { type: String, default: '' },
  masks: { type: Array, default: () => [] },
  selectedMask: { type: String, default: '' },
  opacity: { type: Number, default: 0.4 },
  showLabels: { type: Boolean, default: false },
  showLegend: { type: Boolean, default: false },
}, {});
