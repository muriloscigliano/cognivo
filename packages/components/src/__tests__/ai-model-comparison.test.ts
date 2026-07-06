import { describe, it, expect, afterEach } from 'vitest';
import { AiModelComparison, type ComparisonModel } from '../components/ai-model-comparison/ai-model-comparison.js';

if (!customElements.get('ai-model-comparison')) {
  customElements.define('ai-model-comparison', AiModelComparison);
}

const MODELS: ComparisonModel[] = [
  { name: 'GPT-4', provider: 'OpenAI', scores: { reasoning: 92, coding: 40 }, costTier: '$$$', contextWindow: 128000 },
  { name: 'Claude 3', provider: 'Anthropic', scores: { reasoning: 95, coding: 91 }, costTier: '$$', contextWindow: 200000 },
];

async function mount(props: Partial<AiModelComparison> = {}): Promise<AiModelComparison> {
  const element = document.createElement('ai-model-comparison') as AiModelComparison;
  Object.assign(element, props);
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-model-comparison', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-model-comparison').forEach((el) => el.remove());
  });

  it('renders an accessible empty state (not a blank render) when models is empty', async () => {
    const element = await mount({ models: [] });
    const region = element.shadowRoot!.querySelector('[role="region"]');
    expect(region).not.toBeNull();
    expect(region!.getAttribute('aria-label')).toBe('Model comparison table');
    expect(element.shadowRoot!.querySelector('.empty')!.textContent).toContain('No models to compare');
  });

  // NOTE: jsdom's <template> parsing drops standalone <th>/<td> elements when
  // Lit clones per-row fragments, so tag-name assertions on table cells are
  // unreliable here (the row-header <th scope="row"> conversion is covered by
  // visual/e2e). We assert the observable rendered content instead.
  it('renders every metric label and the meta rows (Cost Tier / Context Window)', async () => {
    const element = await mount({ models: MODELS });
    const text = element.shadowRoot!.textContent!;
    expect(text).toContain('reasoning');
    expect(text).toContain('coding');
    expect(text).toContain('Cost Tier');
    expect(text).toContain('Context Window');
  });

  it('renders each model name and provider in the header', async () => {
    const element = await mount({ models: MODELS });
    const text = element.shadowRoot!.textContent!;
    expect(text).toContain('GPT-4');
    expect(text).toContain('OpenAI');
    expect(text).toContain('Claude 3');
    expect(text).toContain('Anthropic');
    // formatted context windows
    expect(text).toContain('128K');
    expect(text).toContain('200K');
  });

  it('marks the best score per metric with a Best pill only when comparing more than one model', async () => {
    const multi = await mount({ models: MODELS });
    expect(multi.shadowRoot!.querySelectorAll('.best-pill').length).toBeGreaterThan(0);

    const single = await mount({ models: [MODELS[0]] });
    expect(single.shadowRoot!.querySelectorAll('.best-pill').length).toBe(0);
  });

  it('fires ai-comparison-select with the model when a Select button is clicked', async () => {
    const element = await mount({ models: MODELS });
    let detail: { model: ComparisonModel } | null = null;
    element.addEventListener('ai-comparison-select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

    const btn = element.shadowRoot!.querySelector('.select-btn') as HTMLButtonElement;
    btn.click();

    expect(detail).not.toBeNull();
    expect(detail!.model.name).toBe('GPT-4');
  });

  it('renders progressbar semantics on each score track', async () => {
    const element = await mount({ models: MODELS });
    const bar = element.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
    expect(bar.hasAttribute('aria-valuenow')).toBe(true);
  });
});
