import { describe, it, expect, afterEach } from 'vitest';
import { CgSection } from '../components/cg-section/cg-section.js';

if (!customElements.get('cg-section')) {
  customElements.define('cg-section', CgSection);
}

describe('cg-section', () => {
  let el: CgSection;

  async function create(props?: Partial<CgSection>): Promise<CgSection> {
    el = document.createElement('cg-section') as CgSection;
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
    expect(el.shadowRoot!.querySelector('.header')).not.toBeNull();
  });

  it('displays title', async () => {
    await create({ title: 'Settings' });
    const title = el.shadowRoot!.querySelector('.title');
    expect(title).not.toBeNull();
    expect(title!.textContent).toContain('Settings');
  });

  it('is foldable by default', async () => {
    await create();
    expect(el.foldable).toBe(true);
    const chevron = el.shadowRoot!.querySelector('.chevron');
    expect(chevron).not.toBeNull();
  });

  it('starts closed by default', async () => {
    await create();
    const content = el.shadowRoot!.querySelector('.content')!;
    expect(content.classList.contains('open')).toBe(false);
  });

  it('opens when open prop is true', async () => {
    await create({ open: true });
    const content = el.shadowRoot!.querySelector('.content')!;
    expect(content.classList.contains('open')).toBe(true);
  });

  it('toggles on header click', async () => {
    await create({ title: 'Test' });
    const header = el.shadowRoot!.querySelector('.header') as HTMLElement;
    header.click();
    await el.updateComplete;
    const content = el.shadowRoot!.querySelector('.content')!;
    expect(content.classList.contains('open')).toBe(true);
  });

  it('dispatches cg-section-toggle on toggle', async () => {
    await create({ title: 'Test' });
    let detail: any = null;
    el.addEventListener('cg-section-toggle', (e: any) => { detail = e.detail; });
    const header = el.shadowRoot!.querySelector('.header') as HTMLElement;
    header.click();
    expect(detail).not.toBeNull();
    expect(detail.open).toBe(true);
  });

  it('renders description when provided', async () => {
    await create({ description: 'Extra info' });
    const desc = el.shadowRoot!.querySelector('.description');
    expect(desc).not.toBeNull();
    expect(desc!.textContent).toContain('Extra info');
  });

  it('renders badge count when count > 0', async () => {
    await create({ count: 5 });
    const badge = el.shadowRoot!.querySelector('.badge');
    expect(badge).not.toBeNull();
    expect(badge!.textContent).toContain('5');
  });

  it('non-foldable section is always open', async () => {
    await create({ foldable: false });
    const content = el.shadowRoot!.querySelector('.content')!;
    expect(content.classList.contains('open')).toBe(true);
    expect(el.shadowRoot!.querySelector('.chevron')).toBeNull();
  });
});
