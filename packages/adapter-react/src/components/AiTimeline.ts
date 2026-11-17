import { createWrapper } from '../create-wrapper.js';

export const AiTimeline = /* @__PURE__ */ createWrapper(
  'ai-timeline',
  ['steps', 'compact'],
  {
    onStepClick: 'ai-timeline-step-click',
  }
);
