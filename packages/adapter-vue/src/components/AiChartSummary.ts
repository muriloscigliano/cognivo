import { type PropType } from 'vue';
import { createVueWrapper } from '../create-wrapper.js';

export const AiChartSummary = createVueWrapper(
  'ai-chart-summary',
  {
    summary: { type: String, default: '' },
    trends: {
      type: Array as PropType<Array<{ label: string; direction: 'up' | 'down' | 'neutral'; value: string }>>,
      default: () => [],
    },
    collapsible: { type: Boolean, default: false },
  },
  {
    'summary-toggle': 'ai-summary-toggle',
  }
);
