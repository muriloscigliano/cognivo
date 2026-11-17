import { createWrapper } from '../create-wrapper.js';
export const AiDataTable = /* @__PURE__ */ createWrapper('ai-data-table', ['columns', 'data', 'anomalies', 'sortable'],
  {
    onDataSort: 'ai-data-sort',
    onDataCellClick: 'ai-data-cell-click',
    onDataAnomalyClick: 'ai-data-anomaly-click',
  }
);
