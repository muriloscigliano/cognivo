import { describe, it, expect } from 'vitest';
import {
  createVueWrapper,
  AiThinking,
  AiBadge,
  AiChat,
  AiResultPanel,
  AiChartSummary,
  AiInsightCard,
} from '../index.js';

describe('@cognivo/adapter-vue exports', () => {
  it('exports createVueWrapper factory function', () => {
    expect(createVueWrapper).toBeDefined();
    expect(typeof createVueWrapper).toBe('function');
  });

  it('exports AiThinking component', () => {
    expect(AiThinking).toBeDefined();
    expect(AiThinking.name).toBe('AiThinking');
  });

  it('exports AiBadge component', () => {
    expect(AiBadge).toBeDefined();
    expect(AiBadge.name).toBe('AiBadge');
  });

  it('exports AiChat component', () => {
    expect(AiChat).toBeDefined();
    expect(AiChat.name).toBe('AiChat');
  });

  it('exports AiResultPanel component', () => {
    expect(AiResultPanel).toBeDefined();
    expect(AiResultPanel.name).toBe('AiResultPanel');
  });

  it('exports AiChartSummary component', () => {
    expect(AiChartSummary).toBeDefined();
    expect(AiChartSummary.name).toBe('AiChartSummary');
  });

  it('exports AiInsightCard component', () => {
    expect(AiInsightCard).toBeDefined();
    expect(AiInsightCard.name).toBe('AiInsightCard');
  });

  it('createVueWrapper produces a component with correct name', () => {
    const TestComp = createVueWrapper('my-test-widget', {}, {});
    expect(TestComp.name).toBe('MyTestWidget');
  });
});
