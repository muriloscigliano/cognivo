import { describe, it, expect, afterEach } from 'vitest';
import { AiAnalyticsChart } from '../components/ai-analytics-chart/ai-analytics-chart.js';

if (!customElements.get('ai-analytics-chart')) {
  customElements.define('ai-analytics-chart', AiAnalyticsChart);
}

const SVG_NS = 'http://www.w3.org/2000/svg';

describe('ai-analytics-chart', () => {
  let el: AiAnalyticsChart;

  async function create(series: AiAnalyticsChart['series']): Promise<AiAnalyticsChart> {
    el = document.createElement('ai-analytics-chart') as AiAnalyticsChart;
    el.series = series;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders chart geometry in the SVG namespace (regression: nested html`` made the chart invisible)', async () => {
    await create([{ name: 'p50', data: [{ x: 'Mon', y: 120 }, { x: 'Tue', y: 98 }] }]);
    const line = el.shadowRoot!.querySelector('.data-line')!;
    expect(line).not.toBeNull();
    expect(line.namespaceURI).toBe(SVG_NS);
    const gridLine = el.shadowRoot!.querySelector('.grid-line')!;
    expect(gridLine.namespaceURI).toBe(SVG_NS);
    const point = el.shadowRoot!.querySelector('.data-point')!;
    expect(point.namespaceURI).toBe(SVG_NS);
  });

  it('defaults series colors to the chart palette tokens', async () => {
    await create([{ name: 'a', data: [{ x: '1', y: 1 }] }, { name: 'b', data: [{ x: '1', y: 2 }] }]);
    const lines = el.shadowRoot!.querySelectorAll<SVGPathElement>('.data-line');
    expect(lines[0]!.getAttribute('style')).toContain('--cg-color-chart-1-stroke');
    expect(lines[1]!.getAttribute('style')).toContain('--cg-color-chart-2-stroke');
  });

  it('preserves the consumer-supplied x-axis order (no lexicographic sort)', async () => {
    await create([{ name: 's', data: [{ x: 'Mon', y: 1 }, { x: 'Tue', y: 2 }, { x: 'Fri', y: 3 }] }]);
    const labels = Array.from(el.shadowRoot!.querySelectorAll('.axis-label'))
      .map(t => t.textContent!.trim())
      .filter(t => ['Mon', 'Tue', 'Fri'].includes(t));
    expect(labels).toEqual(['Mon', 'Tue', 'Fri']);
  });

  it('renders an empty state instead of a bare grid', async () => {
    await create([]);
    expect(el.shadowRoot!.querySelector('.empty')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('svg')).toBeNull();
  });

  it('data points are keyboard-reachable with accessible labels', async () => {
    await create([{ name: 'p50', data: [{ x: 'Mon', y: 120 }] }]);
    const hit = el.shadowRoot!.querySelector('.hit-circle')!;
    expect(hit.getAttribute('tabindex')).toBe('0');
    expect(hit.getAttribute('aria-label')).toBe('p50, Mon: 120');
  });
});
