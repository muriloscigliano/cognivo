import { createWrapper } from '../create-wrapper.js';

export const AiHeatmap = /* @__PURE__ */ createWrapper(
  'ai-heatmap',
  ['data', 'rowLabels', 'colLabels', 'colorScale', 'showValues', 'title'],
  {
    onCellClick: 'ai-heatmap-cell-click',
  }
);
