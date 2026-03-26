import { describe, it, expect } from 'vitest';
import {
  createWrapper,
  AiThinking,
  AiBadge,
  AiChat,
  AiResultPanel,
  AiChartSummary,
  AiInsightCard,
} from '../index.js';

describe('@cognivo/adapter-react exports', () => {
  it('exports createWrapper factory function', () => {
    expect(createWrapper).toBeDefined();
    expect(typeof createWrapper).toBe('function');
  });

  it('exports AiThinking component', () => {
    expect(AiThinking).toBeDefined();
  });

  it('exports AiBadge component', () => {
    expect(AiBadge).toBeDefined();
  });

  it('exports AiChat component', () => {
    expect(AiChat).toBeDefined();
  });

  it('exports AiResultPanel component', () => {
    expect(AiResultPanel).toBeDefined();
  });

  it('exports AiChartSummary component', () => {
    expect(AiChartSummary).toBeDefined();
  });

  it('exports AiInsightCard component', () => {
    expect(AiInsightCard).toBeDefined();
  });

  it('all wrapper components have displayName set', () => {
    expect(AiThinking.displayName).toBe('AiThinking');
    expect(AiBadge.displayName).toBe('AiBadge');
    expect(AiChat.displayName).toBe('AiChat');
    expect(AiResultPanel.displayName).toBe('AiResultPanel');
    expect(AiChartSummary.displayName).toBe('AiChartSummary');
    expect(AiInsightCard.displayName).toBe('AiInsightCard');
  });

  it('createWrapper produces a component with correct displayName', () => {
    const TestComp = createWrapper<Record<string, unknown>>('my-test-widget', [], {});
    expect(TestComp.displayName).toBe('MyTestWidget');
  });
});
