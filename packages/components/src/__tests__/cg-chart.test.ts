import { describe, it, expect, afterEach } from 'vitest';
import { CgChart, type ChartSeries } from '../components/cg-chart/cg-chart.js';

if (!customElements.get('cg-chart')) {
  customElements.define('cg-chart', CgChart);
}

const sampleData: ChartSeries[] = [
  { label: 'Jan', value: 100 },
  { label: 'Feb', value: 200 },
  { label: 'Mar', value: 150 },
];

describe('cg-chart', () => {
  let el: CgChart;

  async function create(props?: Partial<CgChart>): Promise<CgChart> {
    el = document.createElement('cg-chart') as CgChart;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as any)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
  });

  it('shows empty state when data is empty', async () => {
    await create({ data: [] });
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('No data available');
  });

  it('accepts data array', async () => {
    await create({ data: sampleData });
    expect(el.data).toHaveLength(3);
  });

  it('renders SVG for bar chart', async () => {
    await create({ data: sampleData, type: 'bar' });
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('default type is bar', async () => {
    await create({ data: sampleData });
    expect(el.type).toBe('bar');
  });

  it('renders title when set', async () => {
    await create({ data: sampleData, title: 'Revenue' });
    const title = el.shadowRoot!.querySelector('.title');
    expect(title).not.toBeNull();
    expect(title!.textContent).toBe('Revenue');
  });

  it('renders subtitle when set', async () => {
    await create({ data: sampleData, subtitle: 'Q1 2025' });
    const subtitle = el.shadowRoot!.querySelector('.subtitle');
    expect(subtitle).not.toBeNull();
    expect(subtitle!.textContent).toBe('Q1 2025');
  });

  it('renders legend by default', async () => {
    await create({ data: sampleData });
    const legend = el.shadowRoot!.querySelector('.legend');
    expect(legend).not.toBeNull();
  });

  it('hides legend when showLegend is false', async () => {
    await create({ data: sampleData, showLegend: false });
    const legend = el.shadowRoot!.querySelector('.legend');
    expect(legend).toBeNull();
  });

  it('custom emptyText is displayed', async () => {
    await create({ data: [], emptyText: 'Nothing here' });
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty!.textContent).toContain('Nothing here');
  });
});
