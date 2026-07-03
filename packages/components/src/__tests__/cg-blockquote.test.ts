import { describe, it, expect, afterEach } from 'vitest';
import { CgBlockquote } from '../components/cg-blockquote/cg-blockquote.js';

if (!customElements.get('cg-blockquote')) {
  customElements.define('cg-blockquote', CgBlockquote);
}

describe('cg-blockquote', () => {
  let el: CgBlockquote;

  async function create(props?: Partial<CgBlockquote>): Promise<CgBlockquote> {
    el = document.createElement('cg-blockquote') as CgBlockquote;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders a semantic blockquote', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('blockquote')).not.toBeNull();
  });

  it('reflects variant', async () => {
    await create({ variant: 'accent' });
    expect(el.getAttribute('variant')).toBe('accent');
  });

  it('sets cite attribute when provided', async () => {
    await create({ cite: 'https://example.com' });
    const bq = el.shadowRoot!.querySelector('blockquote')!;
    expect(bq.getAttribute('cite')).toBe('https://example.com');
  });

  it('omits cite attribute when empty', async () => {
    await create();
    const bq = el.shadowRoot!.querySelector('blockquote')!;
    expect(bq.hasAttribute('cite')).toBe(false);
  });

  it('has a footer slot', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot[name="footer"]')).not.toBeNull();
  });
});
