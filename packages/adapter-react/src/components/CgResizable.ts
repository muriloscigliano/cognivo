import { createWrapper } from '../create-wrapper.js';
export const CgResizable = /* @__PURE__ */ createWrapper('cg-resizable', ['direction', 'defaultSize', 'min', 'max'],
  {
    onResize: 'cg-resize',
  }
);
