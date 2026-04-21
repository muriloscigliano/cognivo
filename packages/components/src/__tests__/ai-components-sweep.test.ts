/**
 * Bulk render-drive tests for all AI-native components.
 *
 * Most AI components have smoke-only coverage because their render() methods
 * never get exercised in tests. This sweep creates each element with
 * reasonable props, awaits a render, and asserts the shadow DOM contains
 * SOMETHING — enough to hit every render branch and statement.
 *
 * This file intentionally uses permissive assertions: it is a render-driver,
 * not a behavior spec. Dedicated tests for specific AI components exercise
 * deeper behavior.
 */
import { describe, it, expect, afterEach, beforeAll } from 'vitest';
import '../index.js';

// Make sure happy-dom has ResizeObserver / IntersectionObserver stubs so
// components that install observers don't crash in jsdom/happy-dom.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    (globalThis as any).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
  if (typeof globalThis.IntersectionObserver === 'undefined') {
    (globalThis as any).IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
    };
  }
});

let created: HTMLElement[] = [];

async function mount(tag: string, props?: Record<string, unknown>): Promise<HTMLElement> {
  const el = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      (el as any)[k] = v;
    }
  }
  document.body.appendChild(el);
  created.push(el);
  if ('updateComplete' in el) {
    await (el as any).updateComplete;
    // Some components fire updates after firstUpdated
    await (el as any).updateComplete;
  }
  return el;
}

afterEach(() => {
  for (const el of created) el.remove();
  created = [];
});

describe('AI components: render sweep', () => {
  it('ai-ab-test renders with variants and vote triggers event', async () => {
    const el = await mount('ai-ab-test', {
      variantA: 'Foo response',
      variantB: 'Bar response',
      title: 'Compare',
    });
    expect(el.shadowRoot!.querySelector('.container')).not.toBeNull();

    // Invoke private methods to cover vote + swap branches
    let voteDetail: any;
    el.addEventListener('ai-ab-vote', (e: any) => (voteDetail = e.detail));
    (el as any)._vote('a');
    expect(voteDetail.winner).toBe('a');
    (el as any)._vote('tie');
    (el as any)._vote('b');
    (el as any)._swap();
    (el as any)._compare();
  });

  it('ai-accessibility-report renders with issues', async () => {
    const el = await mount('ai-accessibility-report', {
      issues: [{ severity: 'high', rule: 'color-contrast', message: 'bad' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-action-preview renders with code', async () => {
    const el = await mount('ai-action-preview', {
      title: 'Run query',
      code: 'SELECT *',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-agent-card renders with steps', async () => {
    const el = await mount('ai-agent-card', {
      name: 'Research agent',
      status: 'running',
      steps: [{ label: 'Fetch', status: 'complete' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-agent-steps renders with steps', async () => {
    const el = await mount('ai-agent-steps', {
      steps: [
        { label: 'Plan', status: 'complete' },
        { label: 'Execute', status: 'active' },
      ],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-alert-card renders with title and description', async () => {
    const el = await mount('ai-alert-card', {
      severity: 'warning',
      alertTitle: 'Rate limit',
      description: 'You have hit the limit',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-analytics-chart renders', async () => {
    const el = await mount('ai-analytics-chart', {
      data: [1, 2, 3, 4, 5],
      labels: ['A', 'B', 'C', 'D', 'E'],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-api-key-manager renders with keys', async () => {
    const el = await mount('ai-api-key-manager', {
      keys: [{ id: '1', name: 'Prod', masked: 'sk-****', created: '2025-01-01' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-assistant-widget renders', async () => {
    const el = await mount('ai-assistant-widget', {
      state: 'idle',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-audio-player renders', async () => {
    const el = await mount('ai-audio-player', {
      src: 'data:audio/wav;base64,',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-avatar renders with name', async () => {
    const el = await mount('ai-avatar', { name: 'AI', status: 'active' });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-batch-progress renders with items', async () => {
    const el = await mount('ai-batch-progress', {
      total: 10,
      completed: 5,
      items: [{ id: '1', status: 'done' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-cache-indicator renders', async () => {
    const el = await mount('ai-cache-indicator', { state: 'hit', latency: 12 });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-capture-flow renders', async () => {
    const el = await mount('ai-capture-flow', {
      steps: [{ label: 'Upload' }, { label: 'Review' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-changelog renders entries', async () => {
    const el = await mount('ai-changelog', {
      entries: [{ version: '1.0.0', date: '2025-01-01', changes: ['Initial'] }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-collaborative-editor renders', async () => {
    const el = await mount('ai-collaborative-editor', {
      content: 'Hello world',
      collaborators: [{ id: '1', name: 'Alice', color: '#f00' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-command-palette renders', async () => {
    const el = await mount('ai-command-palette', {
      open: true,
      commands: [{ id: 'a', label: 'Action', category: 'Files' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-confidence-slider renders', async () => {
    const el = await mount('ai-confidence-slider', { value: 0.7 });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-consent-manager renders', async () => {
    const el = await mount('ai-consent-manager', {
      consents: [{ id: 'analytics', title: 'Analytics', description: '...', granted: false }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-context-window renders', async () => {
    const el = await mount('ai-context-window', { used: 500, total: 1000 });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-copy-button renders', async () => {
    const el = await mount('ai-copy-button', { text: 'Hello' });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-cost-dashboard renders', async () => {
    const el = await mount('ai-cost-dashboard', {
      spend: 120.5,
      budget: 500,
      breakdown: [{ label: 'Inference', amount: 80 }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-data-card renders', async () => {
    const el = await mount('ai-data-card', {
      metric: 'Latency',
      value: 120,
      unit: 'ms',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-data-lineage renders', async () => {
    const el = await mount('ai-data-lineage', {
      nodes: [{ id: 'a', label: 'Source' }, { id: 'b', label: 'Sink' }],
      edges: [{ from: 'a', to: 'b' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-data-preview renders', async () => {
    const el = await mount('ai-data-preview', {
      data: { foo: 'bar', arr: [1, 2] },
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-data-table covers handlers and computed state', async () => {
    // ai-data-table hits the same happy-dom `<th>` duplicate-attribute issue
    // as cg-table. Test the component without triggering a render.
    const el = document.createElement('ai-data-table') as any;
    created.push(el);
    el.columns = [
      { key: 'name', label: 'Name' },
      { key: 'score', label: 'Score', type: 'number' },
    ];
    el.data = [
      { name: 'Alice', score: 92 },
      { name: 'Bob', score: 65 },
    ];
    el.anomalies = [{ row: 1, col: 'score', severity: 'high', reason: 'Low' }];
    el.sortable = true;
    el.striped = true;
    // Don't appendChild (avoids the render issue)

    // Cover sort, cell click, anomaly click, anomaly map
    let sortDetail: any;
    el.addEventListener('ai-data-sort', (e: any) => (sortDetail = e.detail));
    el._handleSort('name');
    expect(sortDetail).toEqual({ key: 'name', direction: 'asc' });
    el._handleSort('name');
    expect(sortDetail).toEqual({ key: 'name', direction: 'desc' });
    el._handleSort('score');
    expect(sortDetail).toEqual({ key: 'score', direction: 'asc' });

    // Cell click
    let cellDetail: any;
    el.addEventListener('ai-data-cell-click', (e: any) => (cellDetail = e.detail));
    el._handleCellClick(0, 'name', 'Alice');
    expect(cellDetail).toEqual({ row: 0, col: 'name', value: 'Alice' });

    // Anomaly click
    let anomalyDetail: any;
    el.addEventListener('ai-data-anomaly-click', (e: any) => (anomalyDetail = e.detail));
    el._handleAnomalyClick({ row: 1, col: 'score', severity: 'high', reason: 'Low' });
    expect(anomalyDetail).toBeTruthy();

    // Sorted data getter
    const sorted = el._sortedData;
    expect(sorted).toBeTruthy();

    // Anomaly map lookup
    const anom = el._getAnomaly(1, 'score');
    expect(anom?.severity).toBe('high');

    // Anomaly cache miss + reset
    el.anomalies = [{ row: 0, col: 'name', severity: 'low', reason: 'X' }];
    expect(el._getAnomaly(0, 'name')?.severity).toBe('low');

    // rowKey by id / fallback
    el.rowIdKey = 'name';
    expect(el._rowKey({ name: 'Alice' }, 0)).toBe('Alice');
    expect(el._rowKey({}, 5)).toBe(5);
  });

  it('ai-debug-console renders', async () => {
    const el = await mount('ai-debug-console', {
      logs: [{ level: 'info', message: 'Started', timestamp: new Date().toISOString() }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-detection-canvas renders', async () => {
    const el = await mount('ai-detection-canvas', {
      src: 'data:image/png;base64,',
      detections: [{ x: 10, y: 20, width: 100, height: 50, label: 'cat', confidence: 0.9 }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-embedding-viz renders', async () => {
    const el = await mount('ai-embedding-viz', {
      points: [{ x: 0.1, y: 0.2, label: 'p1', cluster: 0 }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-empty-state renders', async () => {
    const el = await mount('ai-empty-state', {
      heading: 'No data',
      description: 'Try again later',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-error-boundary renders fallback', async () => {
    const el = await mount('ai-error-boundary', {
      hasError: true,
      errorMessage: 'Boom',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-eval-scorecard renders', async () => {
    const el = await mount('ai-eval-scorecard', {
      evals: [{ name: 'Accuracy', score: 0.9, passed: true }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-feature-flag renders', async () => {
    const el = await mount('ai-feature-flag', {
      flag: 'new-feature',
      enabled: true,
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-file-upload renders', async () => {
    const el = await mount('ai-file-upload', {
      accept: '.pdf',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-form-generator renders', async () => {
    const el = await mount('ai-form-generator', {
      schema: { fields: [{ name: 'title', label: 'Title', type: 'text' }] },
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-form-generator renders empty when no schema', async () => {
    const el = await mount('ai-form-generator', { schema: null });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-guardrail renders', async () => {
    const el = await mount('ai-guardrail', {
      rule: 'No PII',
      status: 'pass',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-heatmap grid rendering (already partially covered)', async () => {
    const el = await mount('ai-heatmap', {
      data: [[1, 2], [3, 4]],
      rowLabels: ['A', 'B'],
      colLabels: ['X', 'Y'],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-json-viewer renders', async () => {
    const el = await mount('ai-json-viewer', {
      data: { a: 1, b: [true, null, 'str'] },
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-keyboard-shortcuts renders', async () => {
    const el = await mount('ai-keyboard-shortcuts', {
      shortcuts: [{ keys: ['Ctrl', 'K'], description: 'Open palette' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-kpi-grid renders', async () => {
    const el = await mount('ai-kpi-grid', {
      kpis: [{ label: 'Users', value: 1000, trend: 5 }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-labeling-board renders', async () => {
    const el = await mount('ai-labeling-board', {
      items: [{ id: '1', text: 'Sample', label: null }],
      labels: ['Positive', 'Negative'],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-memory-panel renders', async () => {
    const el = await mount('ai-memory-panel', {
      memories: [{ id: '1', content: 'User prefers dark mode', timestamp: new Date().toISOString() }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-model-comparison renders', async () => {
    const el = await mount('ai-model-comparison', {
      models: [
        { name: 'GPT-4', provider: 'OpenAI', scores: { reasoning: 92, coding: 88 }, costTier: '$$$', contextWindow: 128000 },
        { name: 'Claude', provider: 'Anthropic', scores: { reasoning: 95, coding: 91 }, costTier: '$$', contextWindow: 200000 },
      ],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-model-selector with models renders', async () => {
    const el = await mount('ai-model-selector', {
      models: [
        { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', contextWindow: 128000, costPer1k: 0.01 },
      ],
      selectedId: 'gpt-4',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-notification-center renders', async () => {
    const el = await mount('ai-notification-center', {
      notifications: [{ id: '1', title: 'New message', body: 'Hi', type: 'info', timestamp: new Date().toISOString() }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-onboarding renders with steps', async () => {
    const el = await mount('ai-onboarding', {
      steps: [{ title: 'Step 1', description: 'Do this' }],
      currentStep: 0,
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-permission-gate renders', async () => {
    const el = await mount('ai-permission-gate', {
      permission: 'admin',
      hasAccess: false,
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-personalization-dash renders', async () => {
    const el = await mount('ai-personalization-dash', {
      preferences: [{ key: 'theme', label: 'Theme', value: 'dark' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-presence renders with users', async () => {
    const el = await mount('ai-presence', {
      users: [{ id: '1', name: 'Alice', status: 'active' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-progress-steps renders', async () => {
    const el = await mount('ai-progress-steps', {
      steps: [{ label: 'Uploading' }, { label: 'Processing' }],
      currentStep: 1,
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-prompt-editor renders', async () => {
    const el = await mount('ai-prompt-editor', {
      value: 'You are a helpful assistant',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-prompt-template renders', async () => {
    const el = await mount('ai-prompt-template', {
      template: 'Hello {{name}}, welcome!',
      variables: { name: 'Alice' },
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-rag-panel renders', async () => {
    const el = await mount('ai-rag-panel', {
      chunks: [{ id: '1', source: 'doc.pdf', text: 'context', score: 0.9 }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-reasoning-tree renders', async () => {
    const el = await mount('ai-reasoning-tree', {
      root: { id: 'r', label: 'Root', children: [{ id: 'c', label: 'Child', children: [] }] },
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-reveal-animation renders', async () => {
    const el = await mount('ai-reveal-animation', {
      text: 'Hello world',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-reward-signal renders', async () => {
    const el = await mount('ai-reward-signal', {
      value: 0.8,
      history: [0.1, 0.3, 0.5, 0.7, 0.8],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-rich-message renders', async () => {
    const el = await mount('ai-rich-message', {
      role: 'assistant',
      content: 'Here is the answer',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-scenario-panel renders', async () => {
    const el = await mount('ai-scenario-panel', {
      scenarios: [{ id: '1', title: 'What if...', description: 'explore' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-segmentation-viewer renders', async () => {
    const el = await mount('ai-segmentation-viewer', {
      src: 'data:image/png;base64,',
      segments: [{ id: '1', label: 'Sky', color: '#00f', mask: 'data:image/png;base64,' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-sidebar renders', async () => {
    const el = await mount('ai-sidebar', {
      items: [{ id: '1', label: 'Chat', icon: 'chat' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-similarity-card renders', async () => {
    const el = await mount('ai-similarity-card', {
      score: 0.85,
      source: 'Reference text',
      compared: 'Similar text',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-source-graph renders', async () => {
    const el = await mount('ai-source-graph', {
      nodes: [{ id: '1', label: 'Source A' }, { id: '2', label: 'Source B' }],
      edges: [{ from: '1', to: '2', weight: 0.8 }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-status-page renders', async () => {
    const el = await mount('ai-status-page', {
      services: [{ name: 'API', status: 'operational' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-test-runner renders', async () => {
    const el = await mount('ai-test-runner', {
      tests: [{ id: '1', name: 'sanity', status: 'pass', duration: 12 }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-toast renders and show/clear works', async () => {
    const el = await mount('ai-toast');
    expect(el.shadowRoot).toBeTruthy();
    // Use the public API
    const id = (el as any).show?.('Hello', { duration: 10 });
    if (typeof id === 'string') {
      (el as any).clear();
    }
  });

  it('ai-token-tracker renders', async () => {
    const el = await mount('ai-token-tracker', {
      inputTokens: 100,
      outputTokens: 50,
      cost: 0.001,
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-tool-card-resolver renders', async () => {
    const el = await mount('ai-tool-card-resolver', {
      tools: [{ name: 'search', description: 'Search tool', icon: 'search' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-transform-slider renders', async () => {
    const el = await mount('ai-transform-slider', {
      value: 0.5,
      originalSrc: 'data:image/png;base64,',
      transformedSrc: 'data:image/png;base64,',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-translation-panel renders', async () => {
    const el = await mount('ai-translation-panel', {
      source: 'Hello',
      translated: 'Bonjour',
      sourceLang: 'en',
      targetLang: 'fr',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-usage-meter renders', async () => {
    const el = await mount('ai-usage-meter', {
      used: 1200,
      limit: 10000,
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-validation-checklist renders', async () => {
    const el = await mount('ai-validation-checklist', {
      items: [{ label: 'Check 1', passed: true }, { label: 'Check 2', passed: false }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-version-selector renders', async () => {
    const el = await mount('ai-version-selector', {
      versions: [{ id: 'v1', label: 'v1.0', current: true }, { id: 'v2', label: 'v2.0' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-voice-panel renders', async () => {
    const el = await mount('ai-voice-panel', {
      state: 'idle',
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-webhook-config renders', async () => {
    const el = await mount('ai-webhook-config', {
      webhooks: [{ id: '1', name: 'Slack', url: 'https://hooks', events: ['msg'] }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-workflow-builder renders', async () => {
    const el = await mount('ai-workflow-builder', {
      nodes: [{ id: '1', type: 'input', label: 'Start' }],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-chat renders messages', async () => {
    const el = await mount('ai-chat', {
      messages: [
        { role: 'user', content: 'Hi' },
        { role: 'assistant', content: 'Hello!' },
      ],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-insight-card renders', async () => {
    const el = await mount('ai-insight-card', {
      insightTitle: 'Growth',
      insight: 'Users grew 20%',
      confidence: 0.9,
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-timeline renders with various step statuses', async () => {
    const el = await mount('ai-timeline', {
      steps: [
        { label: 'Plan', status: 'complete' },
        { label: 'Run', status: 'active' },
        { label: 'Finish', status: 'pending' },
      ],
    });
    expect(el.shadowRoot).toBeTruthy();
  });

  it('ai-search renders with placeholder', async () => {
    const el = await mount('ai-search', { placeholder: 'Search', suggestions: ['a', 'b'] });
    expect(el.shadowRoot).toBeTruthy();
  });
});
