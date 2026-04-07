import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CgInput } from '../components/cg-input/cg-input.js';

// Register the custom element if not already registered
if (!customElements.get('cg-input')) {
  customElements.define('cg-input', CgInput);
}

describe('cg-input', () => {
  let el: CgInput;

  beforeEach(async () => {
    el = document.createElement('cg-input') as CgInput;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it('creates and renders with shadow DOM', () => {
    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders a native input element inside shadow DOM', () => {
    const input = el.shadowRoot!.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('accepts value property', async () => {
    el.value = 'hello';
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('hello');
  });

  it('floating label floats on focus', async () => {
    el.label = 'Email';
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    const field = el.shadowRoot!.querySelector('.field');
    expect(field!.classList.contains('floated')).toBe(true);
  });

  it('floating label floats when value is set', async () => {
    el.label = 'Email';
    el.value = 'test@example.com';
    await el.updateComplete;

    const field = el.shadowRoot!.querySelector('.field');
    expect(field!.classList.contains('floated')).toBe(true);
  });

  it('floating label returns to placeholder when blurred and empty', async () => {
    el.label = 'Email';
    await el.updateComplete;

    // Focus
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;

    // Blur with empty value
    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    const field = el.shadowRoot!.querySelector('.field');
    expect(field!.classList.contains('floated')).toBe(false);
  });

  it('dispatches cg-input event on input', async () => {
    let eventDetail: unknown = null;
    el.addEventListener('cg-input', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.value = 'typed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(eventDetail).not.toBeNull();
    expect((eventDetail as { value: string }).value).toBe('typed');
  });

  it('clear button appears when clearable=true and value is non-empty', async () => {
    el.clearable = true;
    el.value = 'some text';
    await el.updateComplete;

    const clearBtn = el.shadowRoot!.querySelector('.clear');
    expect(clearBtn).not.toBeNull();
  });

  it('clear button is hidden when clearable=true but value is empty', async () => {
    el.clearable = true;
    el.value = '';
    await el.updateComplete;

    const clearBtn = el.shadowRoot!.querySelector('.clear');
    expect(clearBtn).toBeNull();
  });

  it('clear button clears value and dispatches cg-clear', async () => {
    el.clearable = true;
    el.value = 'some text';
    await el.updateComplete;

    let clearFired = false;
    el.addEventListener('cg-clear', () => { clearFired = true; });

    let inputEventDetail: unknown = null;
    el.addEventListener('cg-input', ((e: CustomEvent) => {
      inputEventDetail = e.detail;
    }) as EventListener);

    const clearBtn = el.shadowRoot!.querySelector('.clear') as HTMLElement;
    clearBtn.click();
    await el.updateComplete;

    expect(el.value).toBe('');
    expect(clearFired).toBe(true);
    expect(inputEventDetail).not.toBeNull();
    expect((inputEventDetail as { value: string }).value).toBe('');
  });

  it('error state applies error attribute on host', async () => {
    el.error = true;
    await el.updateComplete;

    expect(el.hasAttribute('error')).toBe(true);
    const input = el.shadowRoot!.querySelector('input');
    expect(input!.getAttribute('aria-invalid')).toBe('true');
  });

  it('success state applies success attribute on host', async () => {
    el.success = true;
    await el.updateComplete;

    expect(el.hasAttribute('success')).toBe(true);
  });

  it('helper text renders when helper prop is set', async () => {
    el.helper = 'Enter a valid email';
    await el.updateComplete;

    const helper = el.shadowRoot!.querySelector('.helper');
    expect(helper).not.toBeNull();
    expect(helper!.textContent).toBe('Enter a valid email');
  });

  it('helper text is not rendered when helper prop is empty', () => {
    const helper = el.shadowRoot!.querySelector('.helper');
    expect(helper).toBeNull();
  });

  it('disabled state prevents interaction', async () => {
    el.disabled = true;
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);

    const wrapper = el.shadowRoot!.querySelector('.wrapper');
    expect(wrapper!.classList.contains('disabled')).toBe(true);
  });

  it('size variant "lg" is reflected on host', async () => {
    el.size = 'lg';
    await el.updateComplete;

    expect(el.getAttribute('size')).toBe('lg');
  });

  it('size variant "md" is reflected on host by default', () => {
    expect(el.getAttribute('size')).toBe('md');
  });

  it('size variant "lg" is reflected on host', async () => {
    el.size = 'lg';
    await el.updateComplete;

    expect(el.getAttribute('size')).toBe('lg');
  });

  it('maxlength shows character count', async () => {
    el.maxlength = 200;
    el.value = 'hello';
    await el.updateComplete;

    const count = el.shadowRoot!.querySelector('.count');
    expect(count).not.toBeNull();
    expect(count!.textContent).toBe('5/200');
  });

  it('floating label renders with label text', async () => {
    el.label = 'Username';
    await el.updateComplete;

    const floatingLabel = el.shadowRoot!.querySelector('.floating-label');
    expect(floatingLabel).not.toBeNull();
    expect(floatingLabel!.textContent).toBe('Username');
  });

  it('readonly state applies dashed border style', async () => {
    el.readonly = true;
    await el.updateComplete;

    const wrapper = el.shadowRoot!.querySelector('.wrapper');
    expect(wrapper!.classList.contains('readonly')).toBe(true);

    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
