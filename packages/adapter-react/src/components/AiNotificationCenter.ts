import { createWrapper } from '../create-wrapper.js';
export const AiNotificationCenter = createWrapper('ai-notification-center', ['notifications', 'maxVisible'],
  {
    onNotificationClick: 'ai-notification-click',
    onNotificationDismiss: 'ai-notification-dismiss',
    onNotificationReadAll: 'ai-notification-read-all',
  }
);
