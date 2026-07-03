import { describe, it, expect, afterEach } from 'vitest';
import { CgGrid } from '../components/cg-grid/cg-grid.js';

if (!customElements.get('cg-grid')) {
  customElements.define('cg-grid', CgGrid);
}

describe('cg-grid', () => {
  let el: CgGrid;

  async function create(props?: Partial<CgGrid>): Promise<CgGrid> {
    el = document.createElement('cg-grid') as CgGrid;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM and a slot', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('defaults to 1 column', async () => {
    await create();
    expect(el.columns).toBe(1);
    expect(el.style.getPropertyValue('--_cg-grid-columns')).toBe('1');
  });

  it('sets the columns custom property', async () => {
    await create({ columns: 4 });
    expect(el.style.getPropertyValue('--_cg-grid-columns')).toBe('4');
  });

  it('clamps columns to a minimum of 1', async () => {
    await create({ columns: 0 });
    expect(el.style.getPropertyValue('--_cg-grid-columns')).toBe('1');
  });

  it('reflects gap attribute', async () => {
    await create({ gap: 'lg' });
    expect(el.getAttribute('gap')).toBe('lg');
  });

  it('sets min-column custom property and reflects attribute', async () => {
    await create({ minColumn: '200px' });
    expect(el.getAttribute('min-column')).toBe('200px');
    expect(el.style.getPropertyValue('--_cg-grid-min')).toBe('200px');
  });

  it('reflects align and justify', async () => {
    await create({ align: 'center', justify: 'start' });
    expect(el.getAttribute('align')).toBe('center');
    expect(el.getAttribute('justify')).toBe('start');
  });
});
