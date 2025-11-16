/**
 * @cognivo/components
 *
 * AI-native web components built with Lit.
 * Works in any framework: Vue, React, Angular, Svelte, or vanilla JS.
 */

// Import design tokens CSS
import '@cognivo/tokens';

// Export components
export { AiThinkingIndicator } from './components/ai-thinking-indicator/index.js';
export { AiConfidenceBadge } from './components/ai-confidence-badge/index.js';
export { AiInsightCard } from './components/ai-insight-card/index.js';
export { AiActionButton } from './components/ai-action-button/index.js';

// Export types
export type {
  AiInvokeEvent,
  AiResultEvent,
  AiErrorEvent,
  AiInvokeEventDetail,
  AiResultEventDetail,
  AiErrorEventDetail,
} from './types/events.js';

// Export utilities
export { tokens, token } from './styles/tokens.js';

// Version
export const VERSION = '0.0.0';
