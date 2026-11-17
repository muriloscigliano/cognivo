import { createWrapper } from '../create-wrapper.js';
export const CgTreeView = /* @__PURE__ */ createWrapper('cg-tree-view', ['items', 'multiple', 'selected'],
  {
    onTreeCollapse: 'cg-tree-collapse',
    onTreeExpand: 'cg-tree-expand',
    onTreeSelect: 'cg-tree-select',
  }
);
