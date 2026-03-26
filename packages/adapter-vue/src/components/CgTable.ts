import { createVueWrapper } from '../create-wrapper.js';

export const CgTable = createVueWrapper(
  'cg-table',
  {
    columns: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    striped: { type: Boolean, default: false },
    compact: { type: Boolean, default: false },
    emptyText: { type: String, default: 'No data' },
  },
  {
    'sort': 'cg-sort',
  }
);
