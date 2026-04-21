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

  // ── Child sync ──

  async function createWithChildren(
    type: 'single' | 'multiple',
    initialValue: string | string[] = '',
    values: string[] = ['a', 'b', 'c'],
  ): Promise<CgToggleGroup> {
    el = document.createElement('cg-toggle-group') as CgToggleGroup;
    el.type = type;
    el.value = initialValue;
    for (const v of values) {
      const t = document.createElement('cg-toggle');
      (t as any).value = v;
      t.textContent = v;
      el.appendChild(t);
    }
    document.body.appendChild(el);
    await el.updateComplete;
    // wait for slot children to be synced
    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;
    return el;
  }

  it('single-type syncs pressed state on initial value', async () => {
    await createWithChildren('single', 'b');
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    expect(toggles[0].pressed).toBe(false);
    expect(toggles[1].pressed).toBe(true);
    expect(toggles[2].pressed).toBe(false);
  });

  it('multiple-type syncs pressed state from value array', async () => {
    await createWithChildren('multiple', ['a', 'c']);
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    expect(toggles[0].pressed).toBe(true);
    expect(toggles[1].pressed).toBe(false);
    expect(toggles[2].pressed).toBe(true);
  });

  it('disabled on group disables children', async () => {
    await createWithChildren('single', '');
    el.disabled = true;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    expect(toggles[0].disabled).toBe(true);
    expect(toggles[1].disabled).toBe(true);
  });

  it('child size is propagated', async () => {
    await createWithChildren('single', '');
    el.size = 'lg';
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    expect(toggles[0].size).toBe('lg');
  });

  it('child variant is propagated', async () => {
    await createWithChildren('single', '');
    el.variant = 'outline';
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    expect(toggles[0].variant).toBe('outline');
  });

  // ── Change handling ──

  it('single-type: pressing a toggle sets value and deselects siblings', async () => {
    await createWithChildren('single', 'a');
    let detail: any;
    el.addEventListener('cg-toggle-group-change', (e: any) => (detail = e.detail));

    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    // Simulate user pressing the second toggle
    toggles[1].pressed = true;
    toggles[1].dispatchEvent(new CustomEvent('cg-toggle-change', { bubbles: true, composed: true }));
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;

    expect(el.value).toBe('b');
    expect(detail).toEqual({ value: 'b' });
    expect(toggles[0].pressed).toBe(false);
  });

  it('single-type: unpressing clears value', async () => {
    await createWithChildren('single', 'a');
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    toggles[0].pressed = false;
    toggles[0].dispatchEvent(new CustomEvent('cg-toggle-change', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).toBe('');
  });

  it('multiple-type: pressing adds value to array', async () => {
    await createWithChildren('multiple', ['a']);
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    toggles[1].pressed = true;
    toggles[1].dispatchEvent(new CustomEvent('cg-toggle-change', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).toEqual(['a', 'b']);
  });

  it('multiple-type: unpressing removes value from array', async () => {
    await createWithChildren('multiple', ['a', 'b']);
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    toggles[0].pressed = false;
    toggles[0].dispatchEvent(new CustomEvent('cg-toggle-change', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.value).toEqual(['b']);
  });

  it('multiple-type: does not duplicate values', async () => {
    await createWithChildren('multiple', ['a']);
    const toggles = el.querySelectorAll('cg-toggle') as NodeListOf<any>;
    toggles[0].pressed = true;
    toggles[0].dispatchEvent(new CustomEvent('cg-toggle-change', { bubbles: true, composed: true }));
    await el.updateComplete;
    expect((el.value as string[]).filter(v => v === 'a').length).toBe(1);
  });
});
