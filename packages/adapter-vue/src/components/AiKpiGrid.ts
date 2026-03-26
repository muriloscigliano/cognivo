import { createVueWrapper } from '../create-wrapper.js';
export const AiKpiGrid = createVueWrapper('ai-kpi-grid', {
  title: { type: [String, Array, Object, Number, Boolean] },
  kpis: { type: [String, Array, Object, Number, Boolean] },
  columns: { type: [String, Array, Object, Number, Boolean] },
  loading: { type: [String, Array, Object, Number, Boolean] },
}, {});
