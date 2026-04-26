import { describe, it, expect, afterEach } from 'vitest';
import { CgCollapsible } from '../components/cg-collapsible/cg-collapsible.js';

if (!customElements.get('cg-collapsible')) {
  customElements.define('cg-collapsible', CgCollapsible);
}

describe('cg-collapsible', () => {
  let el: CgCollapsible;

  async function create(props?: Partial<CgCollapsible>): Promise<CgCollapsible> {
    el = document.createElement('cg-collapsible') as CgCollapsible;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.trigger')).not.toBeNull();
  });

  it('default open is false', async () => {
    await create();
    expect(el.open).toBe(false);
  });

  it('open reflects to attribute', async () => {
    await create({ open: true });
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('aria-expanded reflects open state', async () => {
    await create({ open: true });
    const t = el.shadowRoot!.querySelector('.trigger')!;
    expect(t.getAttribute('aria-expanded')).toBe('true');
  });

  it('click trigger toggles open', async () => {
    await create();
    const t = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    t.click();
    await el.updateComplete;
    expect(el.open).toBe(true);
  });

  it('dispatches cg-collapsible-toggle with open detail', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-collapsible-toggle', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const t = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    t.click();
    await el.updateComplete;
    expect(detail.open).toBe(true);
  });

  it('disabled prevents click toggle', async () => {
    await create({ disabled: true });
    const t = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    t.click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('disabled reflects to attribute', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('uses disclosure pattern (aria-expanded + aria-controls), no unnamed region', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    const body = el.shadowRoot!.querySelector('.body')!;
    expect(trigger.getAttribute('aria-controls')).toBe('body');
    expect(body.id).toBe('body');
    expect(body.getAttribute('role')).toBeNull();
  });

  it('renders trigger slot', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot[name="trigger"]');
    expect(slot).not.toBeNull();
  });
});
