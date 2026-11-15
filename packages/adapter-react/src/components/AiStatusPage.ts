import { createWrapper } from '../create-wrapper.js';
export const AiStatusPage = createWrapper('ai-status-page', ['services'],
  {
    onStatusServiceClick: 'ai-status-service-click',
  }
);
