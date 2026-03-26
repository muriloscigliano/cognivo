import { type PropType } from 'vue';
import { createVueWrapper } from '../create-wrapper.js';

export const AiResultPanel = createVueWrapper(
  'ai-result-panel',
  {
    title: { type: String, default: 'AI Analysis' },
    explanation: { type: String, default: '' },
    bullets: { type: Array as PropType<string[]>, default: () => [] },
    drivers: {
      type: Array as PropType<Array<{ factor: string; impact: number }>>,
      default: () => [],
    },
    confidence: { type: Number, default: 0 },
  },
  {}
);
