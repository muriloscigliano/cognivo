import { createWrapper } from '../create-wrapper.js';

export interface AiChartSummaryProps {
  /** AI-generated summary text for the chart. */
  summary?: string;
  /** Trend indicators to display below the summary. */
  trends?: Array<{ label: string; direction: 'up' | 'down' | 'neutral'; value: string }>;
  /** Whether the summary can be collapsed. */
  collapsible?: boolean;
  /** Fired when the summary is toggled (collapsed/expanded). Detail: { collapsed }. */
  onSummaryToggle?: (e: CustomEvent<{ collapsed: boolean }>) => void;
  className?: string;
}

export const AiChartSummary = createWrapper<AiChartSummaryProps>(
  'ai-chart-summary',
  ['summary', 'trends', 'collapsible'],
  { onSummaryToggle: 'ai-summary-toggle' }
);
