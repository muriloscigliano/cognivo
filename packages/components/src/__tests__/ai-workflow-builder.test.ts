import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiWorkflowBuilder } from '../components/ai-workflow-builder/ai-workflow-builder.js';

if (!customElements.get('ai-workflow-builder')) {
  customElements.define('ai-workflow-builder', AiWorkflowBuilder);
}

const STEPS = [
  { id: '1', label: 'Start', type: 'start' as const, status: 'complete' as const },
  { id: '2', label: 'Classify', type: 'agent' as const, status: 'active' as const },
  { id: '3', label: 'End', type: 'end' as const, status: 'pending' as const },
];

describe('ai-workflow-builder', () => {
  let el: AiWorkflowBuilder;

  beforeEach(async () => {
    el = document.createElement('ai-workflow-builder') as AiWorkflowBuilder;
    el.heading = 'Support Agent';
    el.steps = STEPS;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders one step per entry', () => {
    const steps = el.shadowRoot!.querySelectorAll('.step');
    expect(steps.length).toBe(3);
  });

  it('marks the roved step with a persistent .selected class', async () => {
    const steps = Array.from(el.shadowRoot!.querySelectorAll('.step'));
    // _activeIndex defaults to 0.
    expect(steps[0]!.classList.contains('selected')).toBe(true);
    // Click step 2 -> selection follows.
    (steps[2] as HTMLElement).click();
    await el.updateComplete;
    const after = Array.from(el.shadowRoot!.querySelectorAll('.step'));
    expect(after[2]!.classList.contains('selected')).toBe(true);
    expect(after[0]!.classList.contains('selected')).toBe(false);
  });

  it('ArrowDown moves selection and the single tab stop', async () => {
    const first = el.shadowRoot!.querySelector<HTMLElement>('.step')!;
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    const steps = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.step'));
    expect(steps[1]!.getAttribute('tabindex')).toBe('0');
    expect(steps[1]!.classList.contains('selected')).toBe(true);
    expect(steps[0]!.getAttribute('tabindex')).toBe('-1');
  });

  it('emits ai-workflow-step-click on click', async () => {
    let detail: { id: string } | null = null;
    el.addEventListener('ai-workflow-step-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const step = el.shadowRoot!.querySelector<HTMLElement>('.step')!;
    step.click();
    expect(detail).not.toBeNull();
    expect(detail!.id).toBe('1');
  });

  it('empty state carries figure role and heading accessible name', async () => {
    el.steps = [];
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('.container')!;
    expect(container.getAttribute('role')).toBe('figure');
    expect(container.getAttribute('aria-label')).toBe('Support Agent');
    expect(el.shadowRoot!.querySelector('.empty')).not.toBeNull();
  });

  it('focus ring uses the 2-layer non-input focus token family', () => {
    const styles = (el.constructor as typeof AiWorkflowBuilder).styles as { cssText: string }[];
    const cssText = styles.map((s) => s.cssText).join('\n');
    expect(cssText).toContain('var(--cg-focus-ring-offset)');
    expect(cssText).toContain('var(--cg-focus-ring-width)');
    expect(cssText).toContain('var(--cg-color-focus-ring-offset)');
    // Old ad-hoc thickness token must be gone from the focus ring.
    expect(cssText).not.toContain('0 0 0 var(--cg-spacing-2) var(--cg-color-focus-ring)');
  });
});
