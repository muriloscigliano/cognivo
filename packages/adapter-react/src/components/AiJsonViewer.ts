import { createWrapper } from '../create-wrapper.js';
export const AiJsonViewer = createWrapper('ai-json-viewer', ['data', 'expanded', 'maxDepth'],
  {
    onJsonPathClick: 'ai-json-path-click',
  }
);
