import { createWrapper } from '../create-wrapper.js';
export const AiDataLineage = createWrapper('ai-data-lineage', ['rounded', 'nodes', 'edges', 'highlightPath', 'direction'],
  {
    onLineageNodeClick: 'ai-lineage-node-click',
  }
);
