import { createWrapper } from '../create-wrapper.js';
export const CgSheet = /* @__PURE__ */ createWrapper('cg-sheet', ['open', 'side', 'snapPoints', 'activeSnap', 'dismissible'],
  {
    onOpen: 'cg-sheet-open',
    onClose: 'cg-sheet-close',
    onSnap: 'cg-sheet-snap',
  }
);
