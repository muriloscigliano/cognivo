import { describe, it, expect, afterEach } from 'vitest';
import { CgToggle } from '../components/cg-toggle/cg-toggle.js';

if (!customElements.get('cg-toggle')) {
  customElements.define('cg-toggle', CgToggle);
}

describe('cg-toggle', () => {
  let el: CgToggle;

  async function create(props?: Partial<CgToggle>): Promise<CgToggle> {
    el = document.createElement('cg-toggle') as CgToggle;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('button')).not.toBeNull();
  });

  it('default pressed is false', async () => {
    await create();
    expect(el.pressed).toBe(false);
  });

  it('pressed reflects to attribute', async () => {
    await create({ pressed: true });
    expect(el.hasAttribute('pressed')).toBe(true);
  });

  it('aria-pressed="false" when not pressed', async () => {
    await create();
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-pressed')).toBe('false');
  });

  it('aria-pressed="true" when pressed', async () => {
    await create({ pressed: true });
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-pressed')).toBe('true');
  });

  it('click toggles pressed', async () => {
    await create();
    const btn = el.shadowRoot!.querySelector('button')!;
    btn.click();
    await el.updateComplete;
    expect(el.pressed).toBe(true);
  });

  it('dispatches cg-toggle-change with pressed detail', async () => {
    await create({ value: 'bold' });
    let detail: any = null;
    el.addEventListener('cg-toggle-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const btn = el.shadowRoot!.querySelector('button')!;
    btn.click();
    await el.updateComplete;
    expect(detail.pressed).toBe(true);
    expect(detail.value).toBe('bold');
  });

  it('disabled prevents click toggle', async () => {
    await create({ disabled: true });
    const btn = el.shadowRoot!.querySelector('button')!;
    btn.click();
    await el.updateComplete;
    expect(el.pressed).toBe(false);
  });

  it('size reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('variant reflects to attribute', async () => {
    await create({ variant: 'outline' });
    expect(el.getAttribute('variant')).toBe('outline');
  });

  it('is form-associated', () => {
    expect((CgToggle as any).formAssociated).toBe(true);
  });
});
