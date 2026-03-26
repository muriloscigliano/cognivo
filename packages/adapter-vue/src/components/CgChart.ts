import { createVueWrapper } from '../create-wrapper.js';

export const CgChart = createVueWrapper(
  'cg-chart',
  {
    data: { type: Array, default: () => [] },
    type: { type: String, default: 'bar' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    height: { type: Number, default: 240 },
    showLegend: { type: Boolean, default: true },
    showValues: { type: Boolean, default: true },
    showGrid: { type: Boolean, default: true },
    emptyText: { type: String, default: 'No data' },
  },
  {}
);
