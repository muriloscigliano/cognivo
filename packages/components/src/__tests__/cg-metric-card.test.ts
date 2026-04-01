import { describe, it, expect, afterEach } from 'vitest';
import { CgMetricCard } from '../components/cg-metric-card/cg-metric-card.js';

if (!customElements.get('cg-metric-card')) {
  customElements.define('cg-metric-card', CgMetricCard);
}

describe('cg-metric-card', () => {
  let el: CgMetricCard;

  async function create(props?: Partial<CgMetricCard>): Promise<CgMetricCard> {
    el = document.createElement('cg-metric-card') as CgMetricCard;
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
    expect(el.shadowRoot!.querySelector('.card')).not.toBeNull();
  });

  it('displays title', async () => {
    await create({ title: 'Revenue' });
    const title = el.shadowRoot!.querySelector('.title');
    expect(title).not.toBeNull();
    expect(title!.textContent).toContain('Revenue');
  });

  it('displays value', async () => {
    await create({ value: '$2.4M' });
    const value = el.shadowRoot!.querySelector('.value');
    expect(value).not.toBeNull();
    expect(value!.textContent).toContain('$2.4M');
  });

  it('displays delta badge', async () => {
    await create({ delta: '+18%', trend: 'up' });
    const delta = el.shadowRoot!.querySelector('.delta');
    expect(delta).not.toBeNull();
    expect(delta!.textContent).toContain('+18%');
    expect(delta!.classList.contains('up')).toBe(true);
  });

  it('displays down trend', async () => {
    await create({ delta: '-5%', trend: 'down' });
    const delta = el.shadowRoot!.querySelector('.delta');
    expect(delta!.classList.contains('down')).toBe(true);
  });

  it('default trend is neutral', async () => {
    await create();
    expect(el.trend).toBe('neutral');
  });

  it('renders loading skeleton', async () => {
    await create({ loading: true });
    const skeleton = el.shadowRoot!.querySelector('.skeleton');
    expect(skeleton).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.value')).toBeNull();
  });

  it('has ARIA label', async () => {
    await create({ title: 'Users', value: '1,200' });
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card.getAttribute('aria-label')).toContain('Users');
    expect(card.getAttribute('aria-label')).toContain('1,200');
  });

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
  });

  it('renders comparison text', async () => {
    await create({ comparison: 'vs last quarter' });
    const comp = el.shadowRoot!.querySelector('.comparison');
    expect(comp).not.toBeNull();
    expect(comp!.textContent).toContain('vs last quarter');
  });
});
