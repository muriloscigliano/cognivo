import { describe, it, expect, afterEach } from 'vitest';
import { CgText } from '../components/cg-text/cg-text.js';

if (!customElements.get('cg-text')) {
  customElements.define('cg-text', CgText);
}

describe('cg-text', () => {
  let el: CgText;

  async function create(props?: Partial<CgText>): Promise<CgText> {
    el = document.createElement('cg-text') as CgText;
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

  it('renders text content', async () => {
    await create({ text: 'Hello World' });
    const p = el.shadowRoot!.querySelector('p');
    expect(p).not.toBeNull();
    expect(p!.textContent).toContain('Hello World');
  });

  it('default as is p tag', async () => {
    await create({ text: 'Paragraph' });
    expect(el.shadowRoot!.querySelector('p')).not.toBeNull();
  });

  it('renders as h1', async () => {
    await create({ as: 'h1', text: 'Title' });
    expect(el.shadowRoot!.querySelector('h1')).not.toBeNull();
  });

  it('renders as span', async () => {
    await create({ as: 'span', text: 'Inline' });
    expect(el.shadowRoot!.querySelector('span')).not.toBeNull();
  });

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('applies size attribute', async () => {
    await create({ size: 'xl' });
    expect(el.getAttribute('size')).toBe('xl');
  });

  it('default weight is normal', async () => {
    await create();
    expect(el.weight).toBe('normal');
  });

  it('applies weight attribute', async () => {
    await create({ weight: 'bold' });
    expect(el.getAttribute('weight')).toBe('bold');
  });

  it('applies color attribute', async () => {
    await create({ color: 'accent' });
    expect(el.getAttribute('color')).toBe('accent');
  });
});
