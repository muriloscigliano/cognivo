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

  // ── Submit behavior ──

  it('submit preventDefault and emits cg-submit', async () => {
    await create({ name: 'myform' });
    let detail: any;
    el.addEventListener('cg-submit', (e: any) => (detail = e.detail));

    const form = el.shadowRoot!.querySelector('form')!;
    const event = new Event('submit', { cancelable: true, bubbles: true });
    form.dispatchEvent(event);
    await el.updateComplete;

    expect(event.defaultPrevented).toBe(true);
    expect(detail).toEqual({ name: 'myform' });
  });

  it('submit while loading does not emit cg-submit', async () => {
    await create({ loading: true });
    let fired = false;
    el.addEventListener('cg-submit', () => (fired = true));
    const form = el.shadowRoot!.querySelector('form')!;
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    await el.updateComplete;
    expect(fired).toBe(false);
  });

  // ── Reset method ──

  it('reset() emits cg-reset event', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-reset', () => (fired = true));
    el.reset();
    expect(fired).toBe(true);
  });

  it('reset() calls formResetCallback on slotted form-associated custom elements', async () => {
    await create();
    const stub = document.createElement('div') as any;
    let called = false;
    stub.formResetCallback = () => { called = true; };
    el.appendChild(stub);
    await el.updateComplete;
    el.reset();
    expect(called).toBe(true);
  });

  it('reset() calls formResetCallback on nested children too', async () => {
    await create();
    const wrapper = document.createElement('div');
    const inner = document.createElement('div') as any;
    let called = false;
    inner.formResetCallback = () => { called = true; };
    wrapper.appendChild(inner);
    el.appendChild(wrapper);
    await el.updateComplete;
    el.reset();
    expect(called).toBe(true);
  });

  it('aria-busy="false" when not loading', async () => {
    await create({ loading: false });
    const form = el.shadowRoot!.querySelector('form')!;
    expect(form.getAttribute('aria-busy')).toBe('false');
  });

  it('error summary shows the right messages in order', async () => {
    await create({ errors: ['First', 'Second', 'Third'] });
    const items = el.shadowRoot!.querySelectorAll('.error-summary li');
    expect(items[0]!.textContent).toBe('First');
    expect(items[1]!.textContent).toBe('Second');
    expect(items[2]!.textContent).toBe('Third');
  });

  it('error summary has role="alert"', async () => {
    await create({ errors: ['err'] });
    expect(el.shadowRoot!.querySelector('.error-summary')!.getAttribute('role')).toBe('alert');
  });
});
