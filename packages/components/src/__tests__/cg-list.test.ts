import { describe, it, expect, afterEach } from 'vitest';
import { CgList } from '../components/cg-list/cg-list.js';

if (!customElements.get('cg-list')) {
  customElements.define('cg-list', CgList);
}

describe('cg-list', () => {
  let el: CgList;

  async function create(props?: Partial<CgList>): Promise<CgList> {
    el = document.createElement('cg-list') as CgList;
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

  it('shows empty text when no items', async () => {
    await create();
    const empty = el.shadowRoot!.querySelector('.empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('No items');
  });

  it('renders items', async () => {
    await create({ items: [{ title: 'A' }, { title: 'B' }] });
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).toBe(2);
  });

  it('renders plain variant by default', async () => {
    await create({ items: [{ title: 'A' }] });
    expect(el.variant).toBe('plain');
    expect(el.shadowRoot!.querySelector('.bullet')).toBeNull();
    expect(el.shadowRoot!.querySelector('.num')).toBeNull();
  });

  it('renders number variant', async () => {
    await create({ variant: 'number', items: [{ title: 'A' }] });
    const num = el.shadowRoot!.querySelector('.num');
    expect(num).not.toBeNull();
    expect(num!.textContent).toContain('1');
  });

  it('renders image variant with avatar', async () => {
    await create({ variant: 'image', items: [{ title: 'A', image: '/pic.jpg' }] });
    const img = el.shadowRoot!.querySelector('.avatar') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.src).toContain('/pic.jpg');
  });

  it('renders plain variant without indicators', async () => {
    await create({ variant: 'plain', items: [{ title: 'A' }] });
    expect(el.shadowRoot!.querySelector('.bullet')).toBeNull();
    expect(el.shadowRoot!.querySelector('.num')).toBeNull();
  });

  it('renders subtitles', async () => {
    await create({ items: [{ title: 'A', subtitle: 'Sub A' }] });
    const sub = el.shadowRoot!.querySelector('.subtitle');
    expect(sub).not.toBeNull();
    expect(sub!.textContent).toContain('Sub A');
  });

  it('dispatches cg-list-click when clickable', async () => {
    await create({ clickable: true, items: [{ title: 'A' }] });
    let detail: any = null;
    el.addEventListener('cg-list-click', (e: any) => { detail = e.detail; });
    const item = el.shadowRoot!.querySelector('.item') as HTMLElement;
    item.click();
    expect(detail).not.toBeNull();
    expect(detail.index).toBe(0);
  });

  it('dividers disabled by default', async () => {
    await create({ items: [{ title: 'A' }] });
    expect(el.dividers).toBe(false);
    expect(el.getAttribute('dividers')).toBeNull();
  });
});
