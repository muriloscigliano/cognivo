import { describe, it, expect, afterEach } from 'vitest';
import { CgSeparator } from '../components/cg-separator/cg-separator.js';

if (!customElements.get('cg-separator')) {
  customElements.define('cg-separator', CgSeparator);
}

describe('cg-separator', () => {
  let el: CgSeparator;

  async function create(props?: Partial<CgSeparator>): Promise<CgSeparator> {
    el = document.createElement('cg-separator') as CgSeparator;
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
    expect(el.shadowRoot!.querySelector('.line')).not.toBeNull();
  });

  it('default orientation is horizontal', async () => {
    await create();
    expect(el.orientation).toBe('horizontal');
    expect(el.getAttribute('orientation')).toBe('horizontal');
  });

  it('supports vertical orientation', async () => {
    await create({ orientation: 'vertical' });
    expect(el.getAttribute('orientation')).toBe('vertical');
  });

  it('renders separator role when no label', async () => {
    await create();
    const line = el.shadowRoot!.querySelector('.line')!;
    expect(line.getAttribute('role')).toBe('separator');
  });

  it('renders aria-orientation', async () => {
    await create({ orientation: 'vertical' });
    const line = el.shadowRoot!.querySelector('.line')!;
    expect(line.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('renders label text', async () => {
    await create({ label: 'OR' });
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toContain('OR');
    // With label, two lines should be rendered
    const lines = el.shadowRoot!.querySelectorAll('.line');
    expect(lines.length).toBe(2);
  });

  it('default spacing is none', async () => {
    await create();
    expect(el.spacing).toBe('none');
  });

  it('applies spacing attribute', async () => {
    await create({ spacing: 'md' });
    expect(el.getAttribute('spacing')).toBe('md');
  });
});
