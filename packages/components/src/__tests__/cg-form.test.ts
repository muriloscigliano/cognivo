import { describe, it, expect, afterEach } from 'vitest';
import { CgForm } from '../components/cg-form/cg-form.js';

if (!customElements.get('cg-form')) {
  customElements.define('cg-form', CgForm);
}

describe('cg-form', () => {
  let el: CgForm;

  async function create(props?: Partial<CgForm>): Promise<CgForm> {
    el = document.createElement('cg-form') as CgForm;
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

  it('renders a form element', async () => {
    await create();
    const form = el.shadowRoot!.querySelector('form');
    expect(form).not.toBeNull();
  });

  it('form has novalidate attribute', async () => {
    await create();
    const form = el.shadowRoot!.querySelector('form')!;
    expect(form.hasAttribute('novalidate')).toBe(true);
  });

  it('renders a slot for children', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).not.toBeNull();
  });

  it('default gap is md', async () => {
    await create();
    expect(el.gap).toBe('md');
    expect(el.getAttribute('gap')).toBe('md');
  });

  it('gap attribute reflects', async () => {
    await create({ gap: 'lg' });
    expect(el.getAttribute('gap')).toBe('lg');
  });

  it('loading attribute reflects', async () => {
    await create({ loading: true });
    expect(el.hasAttribute('loading')).toBe(true);
  });

  it('form has aria-busy when loading', async () => {
    await create({ loading: true });
    const form = el.shadowRoot!.querySelector('form')!;
    expect(form.getAttribute('aria-busy')).toBe('true');
  });

  it('displays error summary when errors are set', async () => {
    await create({ errors: ['Name is required', 'Email is invalid'] });
    const errorSummary = el.shadowRoot!.querySelector('.error-summary');
    expect(errorSummary).not.toBeNull();
    const items = errorSummary!.querySelectorAll('li');
    expect(items.length).toBe(2);
  });

  it('hides error summary when no errors', async () => {
    await create({ errors: [] });
    const errorSummary = el.shadowRoot!.querySelector('.error-summary');
    expect(errorSummary).toBeNull();
  });
});
