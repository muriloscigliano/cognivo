import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiAgentSteps, type AgentStep } from '../components/ai-agent-steps/ai-agent-steps.js';

if (!customElements.get('ai-agent-steps')) {
  customElements.define('ai-agent-steps', AiAgentSteps);
}

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

const STEPS: AgentStep[] = [
  { label: 'Searching the web', status: 'complete' },
  { label: 'Analyzing content', status: 'loading', detail: '3 of 5 sources' },
  { label: 'Generating summary', status: 'pending' },
];

describe('ai-agent-steps', () => {
  let el: AiAgentSteps;

  beforeEach(async () => {
    el = document.createElement('ai-agent-steps') as AiAgentSteps;
    el.steps = STEPS;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders one listitem per step with the detail below the label', () => {
    const items = el.shadowRoot!.querySelectorAll('[role="listitem"]');
    expect(items.length).toBe(3);
    expect(items[1].querySelector('.step-detail')!.textContent).toBe('3 of 5 sources');
  });

  it('hides decorative status icons and exposes status as visually hidden text', () => {
    const icons = el.shadowRoot!.querySelectorAll('.status-icon');
    icons.forEach((icon) => expect(icon.getAttribute('aria-hidden')).toBe('true'));
    const srTexts = Array.from(el.shadowRoot!.querySelectorAll('.step .sr-only')).map(
      (s) => s.textContent,
    );
    expect(srTexts).toEqual(['complete', 'in progress', 'pending']);
  });

  it('announces a step completing in the polite live region', async () => {
    el.steps = [
      { label: 'Searching the web', status: 'complete' },
      { label: 'Analyzing content', status: 'complete' },
      { label: 'Generating summary', status: 'loading' },
    ];
    await el.updateComplete;
    await nextFrame();
    await el.updateComplete;
    const live = el.shadowRoot!.querySelector('[role="status"]')!;
    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.textContent).toContain('Analyzing content complete');
  });

  it('announces a step failing', async () => {
    el.steps = [
      { label: 'Searching the web', status: 'complete' },
      { label: 'Analyzing content', status: 'error' },
      { label: 'Generating summary', status: 'pending' },
    ];
    await el.updateComplete;
    await nextFrame();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('[role="status"]')!.textContent).toContain(
      'Analyzing content failed',
    );
  });

  it('dispatches ai-step-click for complete steps only', () => {
    const clicks: number[] = [];
    el.addEventListener('ai-step-click', ((e: CustomEvent) => clicks.push(e.detail.index)) as EventListener);
    const items = el.shadowRoot!.querySelectorAll<HTMLElement>('.step');
    items[0].click(); // complete → fires
    items[2].click(); // pending → ignored
    expect(clicks).toEqual([0]);
  });

  it('renders nothing when there are no steps', async () => {
    el.steps = [];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.steps')).toBeNull();
  });
});
