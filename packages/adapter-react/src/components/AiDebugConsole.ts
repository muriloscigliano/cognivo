import { createWrapper } from '../create-wrapper.js';
export const AiDebugConsole = /* @__PURE__ */ createWrapper('ai-debug-console', ['entries', 'open', 'maxEntries'],
  {
    onDebugToggle: 'ai-debug-toggle',
    onDebugClear: 'ai-debug-clear',
  }
);
