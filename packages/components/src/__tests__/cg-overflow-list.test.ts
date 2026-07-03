import { describe, it, expect, afterEach } from 'vitest';
import { CgOverflowList } from '../components/cg-overflow-list/cg-overflow-list.js';

if (!customElements.get('cg-overflow-list')) {
  customElements.define('cg-overflow-list', CgOverflowList);
}

describe('cg-overflow-list', () => {
  let el: CgOverflowList;

  async function create(html = '', props?: Partial<CgOverflowList>): Promise<CgOverflowList> {
    el = document.createElement('cg-overflow-list') as CgOverflowList;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    el.innerHTML = html;
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => requestAnimationFrame(r));
    return el;
  }

  const ITEMS = '<button>One</button><button>Two</button><button>Three</button>';

  afterEach(() => el?.remove());

  it('renders a row with a slot', async () => {
    await create(ITEMS);
    expect(el.shadowRoot!.querySelector('.row slot')).not.toBeNull();
  });

  it('renders a hidden more button by default (nothing overflowing in jsdom)', async () => {
    await create(ITEMS);
    const more = el.shadowRoot!.querySelector('.more') as HTMLButtonElement;
    expect(more).not.toBeNull();
    // jsdom reports zero widths → nothing overflows → button hidden
    expect(more.hidden).toBe(true);
  });

  it('reflects gap and min-visible attributes', async () => {
    await create(ITEMS, { gap: 'md', minVisible: 2 });
    expect(el.getAttribute('gap')).toBe('md');
    expect(el.getAttribute('min-visible')).toBe('2');
  });

  it('more button has menu semantics', async () => {
    await create(ITEMS);
    const more = el.shadowRoot!.querySelector('.more')!;
    expect(more.getAttribute('aria-haspopup')).toBe('menu');
    expect(more.getAttribute('aria-expanded')).toBe('false');
  });

  it('uses more-label for the trigger aria-label', async () => {
    await create(ITEMS, { moreLabel: 'More actions' });
    const more = el.shadowRoot!.querySelector('.more')!;
    expect(more.getAttribute('aria-label')).toBe('More actions');
  });

  it('handles empty list without throwing', async () => {
    await create('');
    expect(el.shadowRoot!.querySelector('.row')).not.toBeNull();
  });

  it('exposes a custom more slot', async () => {
    await create(ITEMS);
    expect(el.shadowRoot!.querySelector('slot[name="more"]')).not.toBeNull();
  });
});
