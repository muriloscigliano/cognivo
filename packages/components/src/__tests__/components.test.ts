/**
 * Component smoke tests — verify all 40 components:
 * 1. Can be created via document.createElement
 * 2. Have the correct tag name
 * 3. Accept key properties
 * 4. Render to Shadow DOM
 */
import { describe, it, expect, beforeAll } from 'vitest';

// Import all components to register custom elements
import '../index.js';

// Helper: create element and wait for Lit render
async function createElement(tag: string, props?: Record<string, unknown>): Promise<HTMLElement> {
  const el = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      (el as any)[k] = v;
    }
  }
  document.body.appendChild(el);
  // Wait for Lit's updateComplete
  if ('updateComplete' in el) {
    await (el as any).updateComplete;
  }
  return el;
}

function cleanup(el: HTMLElement) {
  el.remove();
}

// ─────────────────────────────────────────────────────────────────────────────
// Wave 1: Foundation
// ─────────────────────────────────────────────────────────────────────────────

describe('Wave 1: Foundation', () => {
  it('cg-stack renders with direction', async () => {
    const el = await createElement('cg-stack', { direction: 'row', gap: 'md' });
    expect(el.shadowRoot).toBeTruthy();
    expect(el.getAttribute('direction')).toBe('row');
    cleanup(el);
  });

  it('cg-text renders text content', async () => {
    const el = await createElement('cg-text', { text: 'Hello World', size: '2xl', weight: 'bold' });
    expect(el.shadowRoot?.textContent).toContain('Hello World');
    cleanup(el);
  });

  it('cg-button renders label', async () => {
    const el = await createElement('cg-button', { label: 'Click Me', variant: 'primary' });
    expect(el.shadowRoot?.textContent).toContain('Click Me');
    cleanup(el);
  });

  it('cg-card has shadow root', async () => {
    const el = await createElement('cg-card', { variant: 'outlined' });
    expect(el.shadowRoot).toBeTruthy();
    cleanup(el);
  });

  it('cg-badge renders label with variant', async () => {
    const el = await createElement('cg-badge', { label: 'Active', variant: 'success' });
    expect(el.shadowRoot?.textContent).toContain('Active');
    cleanup(el);
  });

  it('cg-input accepts placeholder', async () => {
    const el = await createElement('cg-input', { placeholder: 'Type here' });
    const input = el.shadowRoot?.querySelector('input');
    expect(input).toBeTruthy();
    cleanup(el);
  });

  it('cg-separator renders', async () => {
    const el = await createElement('cg-separator', { orientation: 'horizontal' });
    expect(el.shadowRoot).toBeTruthy();
    cleanup(el);
  });

  it('cg-icon renders SVG for known icon', async () => {
    const el = await createElement('cg-icon', { name: 'check' });
    const svg = el.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();
    cleanup(el);
  });

  it('cg-callout renders title and description', async () => {
    const el = await createElement('cg-callout', { variant: 'info', title: 'Note', description: 'This is a test' });
    expect(el.shadowRoot?.textContent).toContain('Note');
    expect(el.shadowRoot?.textContent).toContain('This is a test');
    cleanup(el);
  });

  it('cg-image has shadow root', async () => {
    const el = await createElement('cg-image', { src: 'test.jpg', alt: 'Test' });
    expect(el.shadowRoot).toBeTruthy();
    cleanup(el);
  });

  it('cg-label renders text and required indicator', async () => {
    const el = await createElement('cg-label', { text: 'Email', required: true });
    expect(el.shadowRoot?.textContent).toContain('Email');
    expect(el.shadowRoot?.textContent).toContain('*');
    cleanup(el);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 2: Data & Forms
// ─────────────────────────────────────────────────────────────────────────────

describe('Wave 2: Data & Forms', () => {
  it('cg-table is a registered custom element', () => {
    expect(customElements.get('cg-table')).toBeDefined();
  });

  it('cg-select renders options', async () => {
    const el = await createElement('cg-select', {
      options: [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }],
      placeholder: 'Pick one',
    });
    expect(el.shadowRoot?.textContent).toContain('Pick one');
    cleanup(el);
  });

  it('cg-textarea has textarea element', async () => {
    const el = await createElement('cg-textarea', { placeholder: 'Write here', rows: 5 });
    expect(el.shadowRoot?.querySelector('textarea')).toBeTruthy();
    cleanup(el);
  });

  it('cg-checkbox renders label', async () => {
    const el = await createElement('cg-checkbox', { label: 'Agree to terms' });
    expect(el.shadowRoot?.textContent).toContain('Agree to terms');
    cleanup(el);
  });

  // cg-radio, cg-switch, cg-slider use ElementInternals (attachInternals) which
  // is not fully supported in happy-dom. Skip until test env supports it.
  it.skip('cg-radio renders label', async () => {
    const el = await createElement('cg-radio', { label: 'Option A', value: 'a' });
    expect(el.shadowRoot?.textContent).toContain('Option A');
    cleanup(el);
  });

  it.skip('cg-switch renders label', async () => {
    const el = await createElement('cg-switch', { label: 'Enable feature' });
    expect(el.shadowRoot?.textContent).toContain('Enable feature');
    cleanup(el);
  });

  it.skip('cg-slider renders with value', async () => {
    const el = await createElement('cg-slider', { label: 'Volume', min: 0, max: 100, value: 50 });
    expect(el.shadowRoot?.querySelector('input[type="range"]')).toBeTruthy();
    cleanup(el);
  });

  it('cg-form has form element', async () => {
    const el = await createElement('cg-form', { name: 'test-form' });
    expect(el.shadowRoot?.querySelector('form')).toBeTruthy();
    cleanup(el);
  });

  it('cg-date-picker has date input', async () => {
    const el = await createElement('cg-date-picker', { name: 'date' });
    expect(el.shadowRoot?.querySelector('input[type="date"]')).toBeTruthy();
    cleanup(el);
  });

  it('cg-button-group has slot', async () => {
    const el = await createElement('cg-button-group', { direction: 'row' });
    expect(el.shadowRoot).toBeTruthy();
    cleanup(el);
  });

  // cg-metric-card is defined in gen-ui library but implemented in the demo app stubs
  // It will be migrated to @cognivo/components in a future iteration
  it.skip('cg-metric-card is a registered custom element', () => {
    expect(customElements.get('cg-metric-card')).toBeDefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 3: Navigation & Content
// ─────────────────────────────────────────────────────────────────────────────

describe('Wave 3: Navigation & Content', () => {
  it('cg-tabs renders tab buttons', async () => {
    const el = await createElement('cg-tabs', {
      tabs: [{ value: 'a', label: 'Tab A' }, { value: 'b', label: 'Tab B' }],
    });
    expect(el.shadowRoot?.querySelectorAll('[role="tab"]').length).toBe(2);
    cleanup(el);
  });

  it('cg-accordion renders items', async () => {
    const el = await createElement('cg-accordion', {
      items: [{ value: '1', trigger: 'Question 1', content: 'Answer 1' }],
    });
    expect(el.shadowRoot?.textContent).toContain('Question 1');
    cleanup(el);
  });

  it('cg-steps renders step items', async () => {
    const el = await createElement('cg-steps', {
      items: [{ title: 'Step 1', status: 'done' }, { title: 'Step 2', status: 'active' }],
    });
    expect(el.shadowRoot?.textContent).toContain('Step 1');
    expect(el.shadowRoot?.textContent).toContain('Step 2');
    cleanup(el);
  });

  it('cg-carousel has shadow root', async () => {
    const el = await createElement('cg-carousel');
    expect(el.shadowRoot).toBeTruthy();
    cleanup(el);
  });

  it('cg-code-block creates element', async () => {
    const el = await createElement('cg-code-block', { code: 'const x = 1;', language: 'js' });
    expect(el.shadowRoot).toBeTruthy();
    cleanup(el);
  });

  it('cg-markdown renders text', async () => {
    const el = await createElement('cg-markdown', { text: '# Hello\n**bold**' });
    expect(el.shadowRoot).toBeTruthy();
    cleanup(el);
  });

  it('cg-image-block has shadow root', async () => {
    const el = await createElement('cg-image-block', { src: 'test.jpg', alt: 'Test' });
    expect(el.shadowRoot).toBeTruthy();
    cleanup(el);
  });

  it('cg-image-gallery renders grid', async () => {
    const el = await createElement('cg-image-gallery', {
      images: [{ src: 'a.jpg' }, { src: 'b.jpg' }],
    });
    expect(el.shadowRoot?.querySelectorAll('img').length).toBe(2);
    cleanup(el);
  });

  it('cg-badge-group has shadow root', async () => {
    const el = await createElement('cg-badge-group', { label: 'Tags' });
    expect(el.shadowRoot?.textContent).toContain('Tags');
    cleanup(el);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Wave 4: Chat & Data Viz
// ─────────────────────────────────────────────────────────────────────────────

describe('Wave 4: Chat & Data Viz', () => {
  it('cg-list renders items', async () => {
    const el = await createElement('cg-list', {
      items: [{ title: 'Item 1' }, { title: 'Item 2' }],
      variant: 'bullet',
    });
    expect(el.shadowRoot?.textContent).toContain('Item 1');
    expect(el.shadowRoot?.textContent).toContain('Item 2');
    cleanup(el);
  });

  it('cg-follow-up renders suggestion chips', async () => {
    const el = await createElement('cg-follow-up', {
      items: ['Tell me more', 'Show data'],
    });
    expect(el.shadowRoot?.querySelectorAll('button').length).toBe(2);
    cleanup(el);
  });

  it('cg-chart renders SVG', async () => {
    const el = await createElement('cg-chart', {
      data: [{ label: 'A', value: 10 }, { label: 'B', value: 20 }],
      type: 'bar',
    });
    expect(el.shadowRoot?.querySelector('svg')).toBeTruthy();
    cleanup(el);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AI Components
// ─────────────────────────────────────────────────────────────────────────────

describe('AI Components — all 19 exported and renderable', () => {
  const aiComponents = [
    'AiThinking', 'AiBadge', 'AiChat', 'AiInsightCard', 'AiResultPanel',
    'AiChartSummary', 'AiStreamingText', 'AiCitation', 'AiToolIndicator',
    'AiDiffPanel', 'AiTimeline', 'AiFeedback', 'AiToast',
    'AiModelSelector', 'AiTokenTracker', 'AiPromptEditor',
    'AiSearch', 'AiAnnotation', 'AiHeatmap',
  ];

  for (const name of aiComponents) {
    it(`${name} is exported`, async () => {
      const mod = await import('../index.js');
      expect((mod as any)[name]).toBeDefined();
      expect(typeof (mod as any)[name]).toBe('function');
    });
  }

  // Smoke render tests for key AI components
  it('ai-thinking renders with delay=0', async () => {
    const el = await createElement('ai-thinking', { delay: 0 });
    expect(el.shadowRoot?.querySelector('.container')).not.toBeNull();
    cleanup(el);
  });

  it('ai-badge renders with score', async () => {
    const el = await createElement('ai-badge', { score: 0.9 });
    expect(el.shadowRoot?.querySelector('.badge')).not.toBeNull();
    cleanup(el);
  });

  it('ai-diff-panel renders with before/after', async () => {
    const el = await createElement('ai-diff-panel', { before: 'hello', after: 'world' });
    expect(el.shadowRoot?.querySelector('.panel')).not.toBeNull();
    cleanup(el);
  });

  it('ai-timeline renders with steps', async () => {
    const el = await createElement('ai-timeline', { steps: [{ label: 'Test', status: 'complete' }] });
    expect(el.shadowRoot?.querySelector('.timeline')).not.toBeNull();
    cleanup(el);
  });

  it('ai-feedback renders in thumbs mode', async () => {
    const el = await createElement('ai-feedback', { mode: 'thumbs' });
    expect(el.shadowRoot?.querySelector('.container')).not.toBeNull();
    cleanup(el);
  });

  it('ai-token-tracker renders compact', async () => {
    const el = await createElement('ai-token-tracker', { inputTokens: 100, outputTokens: 50, cost: 0.001 });
    expect(el.shadowRoot?.querySelector('.compact')).not.toBeNull();
    cleanup(el);
  });

  it('ai-heatmap renders with data', async () => {
    const el = await createElement('ai-heatmap', { data: [[1,2],[3,4]], rowLabels: ['A','B'], colLabels: ['X','Y'] });
    expect(el.shadowRoot?.querySelector('svg')).not.toBeNull();
    cleanup(el);
  });

  it('ai-search renders input', async () => {
    const el = await createElement('ai-search', { placeholder: 'Test' });
    expect(el.shadowRoot?.querySelector('input')).not.toBeNull();
    cleanup(el);
  });

  it('ai-annotation renders content', async () => {
    const el = await createElement('ai-annotation', { content: 'Hello world' });
    expect(el.shadowRoot?.querySelector('.content')).not.toBeNull();
    cleanup(el);
  });

  it('ai-model-selector renders empty state', async () => {
    const el = await createElement('ai-model-selector', { models: [] });
    expect(el.shadowRoot?.querySelector('.empty')).not.toBeNull();
    cleanup(el);
  });
});
