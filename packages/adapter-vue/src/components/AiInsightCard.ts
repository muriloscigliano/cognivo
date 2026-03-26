import { type PropType } from 'vue';
import { createVueWrapper } from '../create-wrapper.js';

export const AiInsightCard = createVueWrapper(
  'ai-insight-card',
  {
    type: {
      type: String as PropType<'explanation' | 'forecast' | 'anomaly' | 'optimization' | 'classification'>,
      default: 'explanation',
    },
    text: { type: String, default: '' },
    confidence: { type: Number, default: 0 },
    timestamp: { type: String, default: '' },
  },
  {
    'insight-click': 'ai-insight-click',
  }
);
