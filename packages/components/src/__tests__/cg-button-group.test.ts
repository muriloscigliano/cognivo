import { describe, it, expect, afterEach } from 'vitest';
import { CgButtonGroup } from '../components/cg-button-group/cg-button-group.js';

if (!customElements.get('cg-button-group')) {
  customElements.define('cg-button-group', CgButtonGroup);
}

describe('cg-button-group', () => {
  let el: CgButtonGroup;

  async function create(props?: Partial<CgButtonGroup>): Promise<CgButtonGroup> {
    el = document.createElement('cg-button-group') as CgButtonGroup;
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

  it('renders a slot for children', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).not.toBeNull();
  });

  it('default direction is row', async () => {
    await create();
    expect(el.direction).toBe('row');
    expect(el.getAttribute('direction')).toBe('row');
  });

  it('direction attribute reflects to column', async () => {
    await create({ direction: 'column' });
    expect(el.getAttribute('direction')).toBe('column');
  });

  it('default gap is sm', async () => {
    await create();
    expect(el.gap).toBe('sm');
    expect(el.getAttribute('gap')).toBe('sm');
  });

  it('gap attribute reflects', async () => {
    await create({ gap: 'md' });
    expect(el.getAttribute('gap')).toBe('md');
  });

  it('default align is start', async () => {
    await create();
    expect(el.align).toBe('start');
    expect(el.getAttribute('align')).toBe('start');
  });

  it('attached mode reflects as attribute', async () => {
    await create({ attached: true });
    expect(el.hasAttribute('attached')).toBe(true);
  });

  it('has group role', async () => {
    await create();
    const group = el.shadowRoot!.querySelector('[role="group"]');
    expect(group).not.toBeNull();
  });

  it('attached styles exist for shared border radius', () => {
    const styles = CgButtonGroup.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('attached');
    expect(cssText).toContain('border-radius');
  });
});
