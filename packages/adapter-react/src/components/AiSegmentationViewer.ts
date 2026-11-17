import { createWrapper } from '../create-wrapper.js';
export const AiSegmentationViewer = /* @__PURE__ */ createWrapper('ai-segmentation-viewer', ['rounded', 'src', 'masks', 'selectedMask', 'opacity', 'showLabels', 'showLegend'],
  {
    onSegmentSelect: 'ai-segment-select',
    onSegmentToggle: 'ai-segment-toggle',
  }
);
