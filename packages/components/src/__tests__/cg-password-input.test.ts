import { describe, it, expect, afterEach } from 'vitest';
import { CgPasswordInput } from '../components/cg-password-input/cg-password-input.js';

if (!customElements.get('cg-password-input')) {
  customElements.define('cg-password-input', CgPasswordInput);
}

describe('cg-password-input', () => {
  let el: CgPasswordInput;

  async function create(props?: Partial<CgPasswordInput>): Promise<CgPasswordInput> {
    el = document.createElement('cg-password-input') as CgPasswordInput;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('input')).not.toBeNull();
  });

  it('input type is password by default', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.type).toBe('password');
  });

  it('renders label when set', async () => {
    await create({ label: 'Password' });
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label.textContent).toContain('Password');
  });

  it('toggle button switches visibility', async () => {
    await create();
    const toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('.toggle')!;
    toggle.click();
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.type).toBe('text');
  });

  it('dispatches cg-password-toggle with visible', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-password-toggle', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const toggle = el.shadowRoot!.querySelector<HTMLButtonElement>('.toggle')!;
    toggle.click();
    await el.updateComplete;
    expect(detail.visible).toBe(true);
  });

  it('dispatches cg-password-change on input', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-password-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'secret';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(detail.value).toBe('secret');
    expect(typeof detail.strength).toBe('number');
  });

  it('disabled reflects to attribute', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('error reflects to attribute', async () => {
    await create({ error: true });
    expect(el.hasAttribute('error')).toBe(true);
  });

  it('shows strength meter when show-strength and value set', async () => {
    await create({ showStrength: true, value: 'MyPass123!' });
    const bars = el.shadowRoot!.querySelectorAll('.strength-bar');
    expect(bars.length).toBe(4);
  });

  it('is form-associated', () => {
    expect((CgPasswordInput as any).formAssociated).toBe(true);
  });
});
