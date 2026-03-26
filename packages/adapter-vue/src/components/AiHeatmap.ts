import { createVueWrapper } from '../create-wrapper.js';

export const AiHeatmap = createVueWrapper(
  'ai-heatmap',
  {
    data: { type: [String, Array, Object, Number, Boolean] },
    rowLabels: { type: [String, Array, Object, Number, Boolean] },
    colLabels: { type: [String, Array, Object, Number, Boolean] },
    colorScale: { type: [String, Array, Object, Number, Boolean] },
    showValues: { type: [String, Array, Object, Number, Boolean] },
    title: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
