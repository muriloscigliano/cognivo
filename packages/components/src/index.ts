/**
 * @cognivo/components
 *
 * AI-native web components built with Lit.
 * Works in any framework: Vue, React, Angular, Svelte, or vanilla JS.
 *
 * 206 production-ready components organized by category
 */

// Import design tokens CSS
import '@cognivo/tokens';

// ============================================================================
// CHARTS (15 components)
// ============================================================================
export * from './components/charts/index.js';

// ============================================================================
// DATA (18 components)
// ============================================================================
export * from './components/data/index.js';

// ============================================================================
// DISPLAY (15 components)
// ============================================================================
export * from './components/display/index.js';

// ============================================================================
// INTERACTIVE (11 components)
// ============================================================================
export * from './components/interactive/index.js';

// ============================================================================
// AI-ENHANCED (23 components)
// ============================================================================
export * from './components/ai-enhanced/index.js';

// ============================================================================
// SYSTEM (14 components)
// ============================================================================
export * from './components/system/index.js';

// ============================================================================
// CHAT (15 components)
// ============================================================================
export * from './components/chat/index.js';

// ============================================================================
// DASHBOARD (12 components)
// ============================================================================
export * from './components/dashboard/index.js';

// ============================================================================
// GRAPH (36 components)
// ============================================================================
export * from './components/graph/index.js';

// ============================================================================
// LAYOUT (8 components)
// ============================================================================
export * from './components/layout/index.js';

// ============================================================================
// PANELS (9 components)
// ============================================================================
export * from './components/panels/index.js';

// ============================================================================
// PAYMENTS (30 components)
// ============================================================================
export * from './components/payments/index.js';

// ============================================================================
// LEGACY EXPORTS (for backwards compatibility)
// ============================================================================
export { AiThinkingIndicator } from './components/ai-thinking-indicator/index.js';
export { AiConfidenceBadge } from './components/ai-confidence-badge/index.js';
export { AiInsightCard } from './components/ai-insight-card/index.js';
export { AiActionButton } from './components/ai-action-button/index.js';
export { AiResultPanel } from './components/ai-result-panel/index.js';
export { AiTable } from './components/ai-table/index.js';
export type { AiTableColumn, AiTableRow } from './components/ai-table/index.js';
export { AiActionGroup } from './components/ai-action-group/index.js';
export { AiMiniChart } from './components/ai-mini-chart/index.js';
export type { AiChartDataPoint } from './components/ai-mini-chart/index.js';

// ============================================================================
// TYPES & UTILITIES
// ============================================================================
export type {
  AiInvokeEvent,
  AiResultEvent,
  AiErrorEvent,
  AiInvokeEventDetail,
  AiResultEventDetail,
  AiErrorEventDetail,
} from './types/events.js';

export { tokens, token } from './styles/tokens.js';

// ============================================================================
// VERSION
// ============================================================================
export const VERSION = '1.0.0';
