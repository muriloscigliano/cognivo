import { describe, it, expect, afterEach } from 'vitest';
import { CgIcon } from '../components/cg-icon/cg-icon.js';

if (!customElements.get('cg-icon')) {
  customElements.define('cg-icon', CgIcon);
}

describe('cg-icon', () => {
  let el: CgIcon;

  async function create(props?: Partial<CgIcon>): Promise<CgIcon> {
    el = document.createElement('cg-icon') as CgIcon;
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
    await create({ name: 'check' });
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders SVG for built-in icon', async () => {
    await create({ name: 'check' });
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('renders nothing when name is empty', async () => {
    await create({ name: '' });
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).toBeNull();
  });

  it('name attribute reflects', async () => {
    await create({ name: 'star' });
    expect(el.getAttribute('name')).toBe('star');
  });

  it('default size is md', async () => {
    await create({ name: 'check' });
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('size attribute reflects', async () => {
    await create({ name: 'check', size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('color attribute reflects', async () => {
    await create({ name: 'check', color: 'accent' });
    expect(el.getAttribute('color')).toBe('accent');
  });

  it('applies aria-label when label is set', async () => {
    await create({ name: 'check', label: 'Checkmark' });
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Checkmark');
  });

  it('is presentational when no label is set', async () => {
    await create({ name: 'check' });
    const svg = el.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('role')).toBe('presentation');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders different built-in icons', async () => {
    await create({ name: 'search' });
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).not.toBeNull();
    const path = svg!.querySelector('path');
    expect(path).not.toBeNull();
  });
});
