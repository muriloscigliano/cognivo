import { describe, it, expect, afterEach } from 'vitest';
import { CgPhoneInput } from '../components/cg-phone-input/cg-phone-input.js';

if (!customElements.get('cg-phone-input')) {
  customElements.define('cg-phone-input', CgPhoneInput);
}

describe('cg-phone-input', () => {
  let el: CgPhoneInput;

  async function create(props?: Partial<CgPhoneInput>): Promise<CgPhoneInput> {
    el = document.createElement('cg-phone-input') as CgPhoneInput;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('input[type="tel"]')).not.toBeNull();
  });

  it('defaults country to US', async () => {
    await create();
    expect(el.country).toBe('US');
    const dialCode = el.shadowRoot!.querySelector('.dial-code')!.textContent;
    expect(dialCode).toBe('+1');
  });

  it('respects defaultCountry on first connect when country empty', async () => {
    el = document.createElement('cg-phone-input') as CgPhoneInput;
    (el as any).country = '';
    el.defaultCountry = 'BR';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.country).toBe('BR');
  });

  it('reflects country attribute', async () => {
    await create({ country: 'GB' });
    expect(el.getAttribute('country')).toBe('GB');
  });

  it('reflects size and rounded', async () => {
    await create({ size: 'lg', rounded: 'md' });
    expect(el.getAttribute('size')).toBe('lg');
    expect(el.getAttribute('rounded')).toBe('md');
  });

  it('country trigger has aria-haspopup dialog', async () => {
    await create();
    const btn = el.shadowRoot!.querySelector('.trigger')!;
    expect(btn.getAttribute('aria-haspopup')).toBe('dialog');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('clicking the trigger opens the popover', async () => {
    await create();
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    btn.click();
    await el.updateComplete;
    expect(el.open).toBe(true);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders preferred countries first when no query', async () => {
    await create({ open: true, preferredCountries: ['BR', 'GB'] });
    const opts = el.shadowRoot!.querySelectorAll<HTMLElement>('.option');
    expect(opts[0]!.textContent).toContain('Brazil');
    expect(opts[1]!.textContent).toContain('United Kingdom');
  });

  it('searches by country name', async () => {
    await create({ open: true });
    const search = el.shadowRoot!.querySelector<HTMLInputElement>('.search input')!;
    search.value = 'germ';
    search.dispatchEvent(new Event('input'));
    await el.updateComplete;
    const opts = el.shadowRoot!.querySelectorAll<HTMLElement>('.option');
    expect(opts.length).toBe(1);
    expect(opts[0]!.textContent).toContain('Germany');
  });

  it('searches by dial code with leading +', async () => {
    await create({ open: true });
    const search = el.shadowRoot!.querySelector<HTMLInputElement>('.search input')!;
    search.value = '+55';
    search.dispatchEvent(new Event('input'));
    await el.updateComplete;
    const names = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('.option .opt-name'))
      .map(n => n.textContent);
    expect(names).toContain('Brazil');
  });

  it('selecting a country fires cg-phone-input-country-change', async () => {
    await create({ open: true });
    let detail: any = null;
    el.addEventListener('cg-phone-input-country-change', (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    const search = el.shadowRoot!.querySelector<HTMLInputElement>('.search input')!;
    search.value = 'germany';
    search.dispatchEvent(new Event('input'));
    await el.updateComplete;
    el.shadowRoot!.querySelector<HTMLElement>('.option')!.click();
    await el.updateComplete;
    expect(detail?.country).toBe('DE');
    expect(detail?.dialCode).toBe('49');
    expect(el.country).toBe('DE');
    expect(el.open).toBe(false);
  });

  it('typing in number input emits cg-phone-input-change with E.164', async () => {
    await create({ country: 'US' });
    let detail: any = null;
    el.addEventListener('cg-phone-input-change', (e: Event) => {
      detail = (e as CustomEvent).detail;
    });
    const tel = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="tel"]')!;
    tel.value = '5551234567';
    tel.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(detail?.value).toBe('+15551234567');
    expect(detail?.dialCode).toBe('1');
    expect(detail?.nationalNumber).toBe('5551234567');
    expect(detail?.valid).toBe(true);
  });

  it('strips non-digits from typed input', async () => {
    await create({ country: 'BR' });
    const tel = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="tel"]')!;
    tel.value = '(11) 96123-4567';
    tel.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.value).toBe('+5511961234567');
  });

  it('hydrates value into country + national number on init', async () => {
    await create({ value: '+44 7400 123456' });
    expect(el.country).toBe('GB');
    const tel = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="tel"]')!;
    expect(tel.value).toBe('7400123456');
  });

  it('validate() returns false when below minLength', async () => {
    await create({ country: 'US' });
    const tel = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="tel"]')!;
    tel.value = '12345';
    tel.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.validate()).toBe(false);
  });

  it('Escape closes popover and refocuses tel input', async () => {
    await create({ open: true });
    const popover = el.shadowRoot!.querySelector<HTMLElement>('.popover')!;
    popover.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('disabled blocks the trigger', async () => {
    await create({ disabled: true });
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.trigger')!;
    expect(btn.disabled).toBe(true);
  });

  it('error attribute reflects', async () => {
    await create({ error: true });
    expect(el.hasAttribute('error')).toBe(true);
    const tel = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="tel"]')!;
    expect(tel.getAttribute('aria-invalid')).toBe('true');
  });

  it('onlyCountries restricts the visible list', async () => {
    await create({ open: true, onlyCountries: ['US', 'CA', 'GB'] });
    const opts = el.shadowRoot!.querySelectorAll<HTMLElement>('.option');
    expect(opts.length).toBe(3);
  });

  it('national-mode does not change emitted E.164 value', async () => {
    await create({ country: 'FR', nationalMode: true });
    const tel = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="tel"]')!;
    tel.value = '612345678';
    tel.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.value).toBe('+33612345678');
  });
});
