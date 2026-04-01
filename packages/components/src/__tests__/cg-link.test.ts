import { describe, it, expect, afterEach } from 'vitest';
import { CgLink } from '../components/cg-link/cg-link.js';

if (!customElements.get('cg-link')) {
  customElements.define('cg-link', CgLink);
}

describe('cg-link', () => {
  let el: CgLink;

  async function create(props?: Partial<CgLink>): Promise<CgLink> {
    el = document.createElement('cg-link') as CgLink;
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
    expect(el.shadowRoot!.querySelector('a')).not.toBeNull();
  });

  it('default variant is "default"', async () => {
    await create();
    expect(el.variant).toBe('default');
  });

  it('sets href on the anchor', async () => {
    await create({ href: 'https://example.com' });
    const a = el.shadowRoot!.querySelector('a')!;
    expect(a.getAttribute('href')).toBe('https://example.com');
  });

  it('applies variant attribute', async () => {
    await create({ variant: 'accent' });
    expect(el.getAttribute('variant')).toBe('accent');
  });

  it('renders external icon when external is true', async () => {
    await create({ external: true });
    const icon = el.shadowRoot!.querySelector('.external-icon');
    expect(icon).not.toBeNull();
  });

  it('does not render external icon by default', async () => {
    await create();
    const icon = el.shadowRoot!.querySelector('.external-icon');
    expect(icon).toBeNull();
  });

  it('sets target="_blank" when external', async () => {
    await create({ external: true, href: 'https://example.com' });
    const a = el.shadowRoot!.querySelector('a')!;
    expect(a.getAttribute('target')).toBe('_blank');
  });

  it('applies disabled state', async () => {
    await create({ disabled: true });
    expect(el.getAttribute('disabled')).not.toBeNull();
    const a = el.shadowRoot!.querySelector('a')!;
    expect(a.getAttribute('aria-disabled')).toBe('true');
  });

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
  });

  it('dispatches cg-link-click on click', async () => {
    await create({ href: '#' });
    let fired = false;
    el.addEventListener('cg-link-click', () => { fired = true; });
    el.shadowRoot!.querySelector('a')!.click();
    expect(fired).toBe(true);
  });
});
