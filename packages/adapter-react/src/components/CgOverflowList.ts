import { createWrapper } from '../create-wrapper.js';
export const CgOverflowList = createWrapper('cg-overflow-list', ['gap', 'minVisible', 'moreLabel'], { onChange: 'cg-overflow-change', onSelect: 'cg-overflow-select' });
