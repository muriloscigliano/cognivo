import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiHeatmap } from '../components/ai-heatmap/ai-heatmap.js';

if (!customElements.get('ai-heatmap')) {
  customElements.define('ai-heatmap', AiHeatmap);
}

describe('ai-heatmap', () => {
  let element: AiHeatmap;

  beforeEach(async () => {
    element = document.createElement('ai-heatmap') as AiHeatmap;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('renders an empty state with no data', () => {
    const empty = element.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
  });

  it('exposes the SVG as role="img" with a summary label (valid ARIA)', async () => {
    element.data = [[1, 2], [3, 4]];
    element.title = 'Matrix';
    await element.updateComplete;

    const svg = element.shadowRoot!.querySelector('svg');
    expect(svg!.getAttribute('role')).toBe('img');
    expect(svg!.getAttribute('aria-label')).toContain('2 rows by 2 columns');
  });

  it('exposes interactive cells as role="button" (not gridcell)', async () => {
    element.data = [[1, 2], [3, 4]];
    await element.updateComplete;

    const cells = element.shadowRoot!.querySelectorAll('rect.cell');
    expect(cells.length).toBe(4);
    cells.forEach(c => {
      expect(c.getAttribute('role')).toBe('button');
      expect(c.getAttribute('tabindex')).toBe('0');
    });
  });

  it('activates a cell on both Enter and Space (Space is prevented)', async () => {
    element.data = [[5]];
    await element.updateComplete;

    const events: number[] = [];
    element.addEventListener('ai-heatmap-cell-click', ((e: CustomEvent) => {
      events.push(e.detail.value);
    }) as EventListener);

    const cell = element.shadowRoot!.querySelector('rect.cell') as SVGElement;
    cell.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    const spaceEvt = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    cell.dispatchEvent(spaceEvt);

    expect(events).toEqual([5, 5]);
    expect(spaceEvt.defaultPrevented).toBe(true);
  });

  it('shows tooltip on focus (keyboard parity with hover)', async () => {
    element.data = [[9]];
    element.rowLabels = ['R0'];
    element.colLabels = ['C0'];
    await element.updateComplete;

    const cell = element.shadowRoot!.querySelector('rect.cell') as SVGElement;
    cell.dispatchEvent(new FocusEvent('focus'));
    await element.updateComplete;

    const tooltip = element.shadowRoot!.querySelector('.tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip!.textContent).toContain('9');

    cell.dispatchEvent(new FocusEvent('blur'));
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('.tooltip')).toBeNull();
  });
});
