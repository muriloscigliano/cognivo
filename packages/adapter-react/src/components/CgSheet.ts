import { createWrapper } from '../create-wrapper.js';
export const CgSheet = createWrapper('cg-sheet', ['open', 'side', 'snapPoints', 'activeSnap', 'dismissible'],
  {
    onOpen: 'cg-sheet-open',
    onClose: 'cg-sheet-close',
    onSnap: 'cg-sheet-snap',
  }
);
