/**
 * @cognivo/components
 *
 * AI-native web components built with Lit.
 * Works in any framework: Vue, React, Angular, Svelte, or vanilla JS.
 */

// Import design tokens CSS
import '@cognivo/tokens';

// Export AI components
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

// Export chart components
export { BarChart } from './components/charts/bar-chart.js';
export type { BarChartData } from './components/charts/bar-chart.js';
export { LineChart } from './components/charts/line-chart.js';
export type { LineChartData, LineChartSeries } from './components/charts/line-chart.js';

// Export data components
export { DataTable } from './components/data/data-table.js';
export type { DataTableColumn, DataTableRow } from './components/data/data-table.js';
export { DataCard } from './components/data/data-card.js';

// Export display components
export { KpiCard } from './components/display/kpi-card.js';

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
