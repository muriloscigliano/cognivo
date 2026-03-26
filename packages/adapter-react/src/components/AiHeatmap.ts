import { createWrapper } from '../create-wrapper.js';

export const AiHeatmap = createWrapper(
  'ai-heatmap',
  ['data', 'rowLabels', 'colLabels', 'colorScale', 'showValues', 'title'],
  {}
);
