import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiTimeline, type TimelineStep } from '../components/ai-timeline/ai-timeline.js';

if (!customElements.get('ai-timeline')) {
  customElements.define('ai-timeline', AiTimeline);
}

describe('ai-timeline', () => {
  let element: AiTimeline;

  beforeEach(async () => {
    element = document.createElement('ai-timeline') as AiTimeline;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('renders an empty-state message when there are no steps (AT-5)', () => {
    const empty = element.shadowRoot!.querySelector('.empty-state');
    expect(empty).not.toBeNull();
    expect(element.shadowRoot!.querySelector('.timeline')).toBeNull();
  });

  it('removes aria-current entirely on non-active steps (AT-1)', async () => {
    element.steps = [
      { label: 'One', status: 'complete' },
      { label: 'Two', status: 'active' },
    ] as TimelineStep[];
    await element.updateComplete;

    const steps = element.shadowRoot!.querySelectorAll('.timeline > .step');
    expect(steps[0]!.hasAttribute('aria-current')).toBe(false);
    expect(steps[1]!.getAttribute('aria-current')).toBe('step');
  });

  it('wraps nested children in a list with listitem children (AT-2)', async () => {
    element.steps = [
      {
        label: 'Parent',
        status: 'complete',
        children: [
          { label: 'Child A', status: 'complete' },
          { label: 'Child B', status: 'pending' },
        ],
      },
    ] as TimelineStep[];
    await element.updateComplete;

    const childList = element.shadowRoot!.querySelector('.children');
    expect(childList!.getAttribute('role')).toBe('list');
    const childItems = Array.from(childList!.children).filter((c) => c.classList.contains('step'));
    expect(childItems.length).toBe(2);
    childItems.forEach((c) => expect(c.getAttribute('role')).toBe('listitem'));
  });

  it('emits ai-timeline-step-click when a top-level step is clicked (AT-2 interactivity)', async () => {
    element.steps = [{ label: 'One', status: 'active' }] as TimelineStep[];
    await element.updateComplete;

    let detail: { index: number } | undefined;
    element.addEventListener('ai-timeline-step-click', (e) => {
      detail = (e as CustomEvent).detail;
    });
    const step = element.shadowRoot!.querySelector('.timeline > .step') as HTMLElement;
    step.click();
    expect(detail?.index).toBe(0);
  });

  it('gives active steps a persistent row accent and keeps complete labels full-strength (AT-6)', () => {
    const css = (AiTimeline as unknown as { styles: Array<{ cssText: string }> }).styles
      .map((s) => s.cssText).join('\n');
    expect(css).toMatch(/\.step\.active\s*\{[^}]*--cg-overlay-accent-strong/);
    expect(css).not.toMatch(/\.step\.complete \.step-label/);
  });
});
