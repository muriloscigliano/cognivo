import { createWrapper } from '../create-wrapper.js';
export const CgOverflowList = /* @__PURE__ */ createWrapper('cg-overflow-list', ['gap', 'minVisible', 'moreLabel'],
  {
    onOverflowChange: 'cg-overflow-change',
    onOverflowSelect: 'cg-overflow-select',
  }
);
