import { describe, it, expect } from 'vitest';
import {
  AiThinking, AiBadge, AiChat, AiResultPanel,
  AiChartSummary, AiInsightCard,
  AiStreamingText, AiCitation, AiToolIndicator,
} from '../index.js';

describe('@cognivo/components exports', () => {
  it('exports AiThinking', () => { expect(typeof AiThinking).toBe('function'); });
  it('exports AiBadge', () => { expect(typeof AiBadge).toBe('function'); });
  it('exports AiChat', () => { expect(typeof AiChat).toBe('function'); });
  it('exports AiResultPanel', () => { expect(typeof AiResultPanel).toBe('function'); });
  it('exports AiChartSummary', () => { expect(typeof AiChartSummary).toBe('function'); });
  it('exports AiInsightCard', () => { expect(typeof AiInsightCard).toBe('function'); });
  it('exports AiStreamingText', () => { expect(typeof AiStreamingText).toBe('function'); });
  it('exports AiCitation', () => { expect(typeof AiCitation).toBe('function'); });
  it('exports AiToolIndicator', () => { expect(typeof AiToolIndicator).toBe('function'); });
});
