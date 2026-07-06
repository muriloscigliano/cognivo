import { describe, it, expect, afterEach } from 'vitest';
import { AiEmbeddingViz } from '../components/ai-embedding-viz/ai-embedding-viz.js';

if (!customElements.get('ai-embedding-viz')) {
  customElements.define('ai-embedding-viz', AiEmbeddingViz);
}

async function mount(props: Partial<AiEmbeddingViz> = {}): Promise<AiEmbeddingViz> {
  const element = document.createElement('ai-embedding-viz') as AiEmbeddingViz;
  Object.assign(element, {
    points: [
      { x: 0.2, y: 0.8, label: 'cat', cluster: 'animals' },
      { x: 0.7, y: 0.3, label: 'car', cluster: 'vehicles' },
    ],
    ...props,
  });
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-embedding-viz', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-embedding-viz').forEach((el) => el.remove());
  });

  it('colors points from chart tokens rather than raw hex (F1)', async () => {
    const element = await mount();
    const circles = Array.from(element.shadowRoot!.querySelectorAll('circle.point'));
    for (const c of circles) {
      const fill = c.getAttribute('fill')!;
      expect(fill.startsWith('var(--cg-color-chart-')).toBe(true);
      expect(fill).not.toMatch(/#[0-9a-f]{3,6}/i);
    }
    const legendDots = Array.from(element.shadowRoot!.querySelectorAll('.legend-dot')) as HTMLElement[];
    for (const d of legendDots) {
      expect(d.getAttribute('style')!).toContain('var(--cg-color-chart-');
    }
  });

  it('SVG uses role=group so interactive point children stay exposed to AT (F2)', async () => {
    const element = await mount();
    const svg = element.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('role')).toBe('group');
    expect(svg.getAttribute('aria-label')).toContain('embedding points');
  });

  it('no raw hex remains in the module source (F1/F3)', async () => {
    const element = await mount();
    const css = (element.constructor as typeof AiEmbeddingViz).styles!.toString();
    expect(css).not.toContain('--cg-color-input-border-hover');
    expect(css).not.toContain('.axis-label');
    expect(css).toContain('--cg-color-focus-ring'); // F4 solid focus ring
  });

  it('marks a clicked point as selected for persistent visual confirmation (F5)', async () => {
    const element = await mount();
    let fired = false;
    element.addEventListener('ai-embedding-point-click', () => { fired = true; });
    const circle = element.shadowRoot!.querySelector('circle.point') as SVGElement;
    circle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await element.updateComplete;
    expect(fired).toBe(true);
    expect(element.shadowRoot!.querySelector('circle.point')!.classList.contains('selected')).toBe(true);
  });
});
