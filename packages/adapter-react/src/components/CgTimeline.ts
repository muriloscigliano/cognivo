import { createWrapper } from '../create-wrapper.js';
export const CgTimeline = createWrapper('cg-timeline', ['label', 'reorderable'], { onReorder: 'cg-reorder' });
