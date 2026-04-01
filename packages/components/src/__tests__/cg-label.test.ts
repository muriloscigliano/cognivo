import { describe, it, expect, afterEach } from 'vitest';
import { CgLabel } from '../components/cg-label/cg-label.js';

if (!customElements.get('cg-label')) {
  customElements.define('cg-label', CgLabel);
}

describe('cg-label', () => {
  let el: CgLabel;

  async function create(props?: Partial<CgLabel>): Promise<CgLabel> {
    el = document.createElement('cg-label') as CgLabel;
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

  it('renders a label element', async () => {
    await create({ text: 'Username' });
    const label = el.shadowRoot!.querySelector('label');
    expect(label).not.toBeNull();
  });

  it('displays text prop', async () => {
    await create({ text: 'Email address' });
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label.textContent).toContain('Email address');
  });

  it('shows required indicator when required', async () => {
    await create({ text: 'Name', required: true });
    const required = el.shadowRoot!.querySelector('.required');
    expect(required).not.toBeNull();
    expect(required!.textContent).toContain('*');
  });

  it('hides required indicator by default', async () => {
    await create({ text: 'Name' });
    const required = el.shadowRoot!.querySelector('.required');
    expect(required).toBeNull();
  });

  it('displays hint text', async () => {
    await create({ text: 'Password', hint: 'At least 8 characters' });
    const hint = el.shadowRoot!.querySelector('.hint');
    expect(hint).not.toBeNull();
    expect(hint!.textContent).toBe('At least 8 characters');
  });

  it('displays error text instead of hint', async () => {
    await create({ text: 'Email', hint: 'We need your email', error: 'Invalid email' });
    const errorEl = el.shadowRoot!.querySelector('.error-text');
    expect(errorEl).not.toBeNull();
    expect(errorEl!.textContent).toBe('Invalid email');
    const hint = el.shadowRoot!.querySelector('.hint');
    expect(hint).toBeNull();
  });

  it('error has alert role', async () => {
    await create({ error: 'Something went wrong' });
    const errorEl = el.shadowRoot!.querySelector('.error-text');
    expect(errorEl!.getAttribute('role')).toBe('alert');
  });

  it('disabled attribute reflects', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('required indicator has aria-hidden', async () => {
    await create({ text: 'Name', required: true });
    const required = el.shadowRoot!.querySelector('.required');
    expect(required!.getAttribute('aria-hidden')).toBe('true');
  });
});
