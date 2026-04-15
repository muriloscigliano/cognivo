import { describe, it, expect, afterEach } from 'vitest';
import { CgToggleGroup } from '../components/cg-toggle-group/cg-toggle-group.js';
import '../components/cg-toggle/cg-toggle.js';

if (!customElements.get('cg-toggle-group')) {
  customElements.define('cg-toggle-group', CgToggleGroup);
}

describe('cg-toggle-group', () => {
  let el: CgToggleGroup;

  async function create(props?: Partial<CgToggleGroup>): Promise<CgToggleGroup> {
    el = document.createElement('cg-toggle-group') as CgToggleGroup;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('div')).not.toBeNull();
  });

  it('default type is single', async () => {
    await create();
    expect(el.type).toBe('single');
  });

  it('wrapper has role="group" when single', async () => {
    await create({ type: 'single' });
    const div = el.shadowRoot!.querySelector('div')!;
    expect(div.getAttribute('role')).toBe('group');
  });

  it('wrapper has role="toolbar" when multiple', async () => {
    await create({ type: 'multiple' });
    const div = el.shadowRoot!.querySelector('div')!;
    expect(div.getAttribute('role')).toBe('toolbar');
  });

  it('orientation reflects to attribute', async () => {
    await create({ orientation: 'vertical' });
    expect(el.getAttribute('orientation')).toBe('vertical');
  });

  it('size reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('variant reflects to attribute', async () => {
    await create({ variant: 'outline' });
    expect(el.getAttribute('variant')).toBe('outline');
  });

  it('disabled reflects to attribute', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('default value is empty string', async () => {
    await create();
    expect(el.value).toBe('');
  });

  it('renders slot for toggles', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).not.toBeNull();
  });
});
