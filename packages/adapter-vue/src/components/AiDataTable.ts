import { createVueWrapper } from '../create-wrapper.js';
export const AiDataTable = createVueWrapper('ai-data-table', {
  columns: { type: [String, Array, Object, Number, Boolean] },
  data: { type: [String, Array, Object, Number, Boolean] },
  anomalies: { type: [String, Array, Object, Number, Boolean] },
  sortable: { type: [String, Array, Object, Number, Boolean] },
}, {});
