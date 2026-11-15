import { createWrapper } from '../create-wrapper.js';
export const CgTreeView = createWrapper('cg-tree-view', ['items', 'multiple', 'selected'],
  {
    onTreeCollapse: 'cg-tree-collapse',
    onTreeExpand: 'cg-tree-expand',
    onTreeSelect: 'cg-tree-select',
  }
);
