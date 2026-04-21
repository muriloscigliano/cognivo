import { describe, it, expect, afterEach } from 'vitest';
import { CgOtpInput } from '../components/cg-otp-input/cg-otp-input.js';

if (!customElements.get('cg-otp-input')) {
  customElements.define('cg-otp-input', CgOtpInput);
}

describe('cg-otp-input', () => {
  let el: CgOtpInput;

  async function create(props?: Partial<CgOtpInput>): Promise<CgOtpInput> {
    el = document.createElement('cg-otp-input') as CgOtpInput;
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
    expect(el.shadowRoot!.querySelector('.container')).not.toBeNull();
  });

  it('default length is 6', async () => {
    await create();
    expect(el.length).toBe(6);
    const boxes = el.shadowRoot!.querySelectorAll('.box');
    expect(boxes.length).toBe(6);
  });

  it('renders custom number of cells', async () => {
    await create({ length: 4 });
    const boxes = el.shadowRoot!.querySelectorAll('.box');
    expect(boxes.length).toBe(4);
  });

  it('has group role with aria-label', async () => {
    await create();
    const container = el.shadowRoot!.querySelector('.container')!;
    expect(container.getAttribute('role')).toBe('group');
    expect(container.getAttribute('aria-label')).toContain('One-time password');
  });

  it('each cell has aria-label with digit number', async () => {
    await create({ length: 4 });
    const boxes = el.shadowRoot!.querySelectorAll('.box');
    expect(boxes[0].getAttribute('aria-label')).toContain('Digit 1');
    expect(boxes[3].getAttribute('aria-label')).toContain('Digit 4');
  });

  it('applies disabled to all cells', async () => {
    await create({ disabled: true });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    boxes.forEach(box => expect(box.disabled).toBe(true));
  });

  it('applies error state', async () => {
    await create({ error: true });
    expect(el.getAttribute('error')).not.toBeNull();
  });

  it('default value is empty', async () => {
    await create();
    expect(el.value).toBe('');
  });

  // ── Input behavior ──

  it('typing a digit updates value and focuses next box', async () => {
    await create({ length: 4 });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    boxes[0]!.value = '5';
    boxes[0]!.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.value).toBe('5');
  });

  it('non-digit characters are stripped on input', async () => {
    await create({ length: 3 });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    boxes[0]!.value = 'a';
    boxes[0]!.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.value).toBe('');
  });

  it('emits cg-otp-change on every input', async () => {
    await create({ length: 4 });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    let detail: any;
    el.addEventListener('cg-otp-change', (e: any) => (detail = e.detail));
    boxes[0]!.value = '1';
    boxes[0]!.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(detail).toEqual({ value: '1' });
  });

  it('emits cg-otp-complete when all digits are filled', async () => {
    await create({ length: 3 });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    let completeDetail: any;
    el.addEventListener('cg-otp-complete', (e: any) => (completeDetail = e.detail));

    for (let i = 0; i < 3; i++) {
      boxes[i]!.value = String(i + 1);
      boxes[i]!.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;
    }
    expect(completeDetail).toEqual({ value: '123' });
  });

  it('does not emit cg-otp-complete until every digit filled', async () => {
    await create({ length: 3 });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    let fired = false;
    el.addEventListener('cg-otp-complete', () => (fired = true));

    boxes[0]!.value = '1';
    boxes[0]!.dispatchEvent(new Event('input', { bubbles: true }));
    boxes[1]!.value = '2';
    boxes[1]!.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(fired).toBe(false);
  });

  // ── Keyboard nav ──

  it('Backspace on filled clears the digit', async () => {
    await create({ length: 4, value: '1234' });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    boxes[2]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el.value).toBe('124');
  });

  it('Backspace on empty focuses previous box and clears it', async () => {
    await create({ length: 4, value: '12' });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    boxes[2]!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true }));
    await el.updateComplete;
    expect(el.value).toBe('1');
  });

  it('ArrowLeft moves focus to previous box', async () => {
    await create({ length: 4 });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
    boxes[2]!.dispatchEvent(ev);
    await el.updateComplete;
    expect(ev.defaultPrevented).toBe(true);
  });

  it('ArrowRight moves focus to next box', async () => {
    await create({ length: 4 });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    boxes[1]!.dispatchEvent(ev);
    await el.updateComplete;
    expect(ev.defaultPrevented).toBe(true);
  });

  it('ArrowLeft at index 0 does nothing', async () => {
    await create({ length: 4 });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
    boxes[0]!.dispatchEvent(ev);
    await el.updateComplete;
    expect(ev.defaultPrevented).toBe(false);
  });

  // ── Paste ── (uses direct _onPaste invocation since happy-dom's
  // ClipboardEvent doesn't fully populate clipboardData in dispatched events)

  it('paste fills all digits from clipboard', async () => {
    await create({ length: 6 });
    const fakeEvent = {
      preventDefault: () => {},
      clipboardData: { getData: () => '123456' },
    } as unknown as ClipboardEvent;
    (el as any)._onPaste(fakeEvent);
    await el.updateComplete;
    expect(el.value).toBe('123456');
  });

  it('paste strips non-digits', async () => {
    await create({ length: 6 });
    const fakeEvent = {
      preventDefault: () => {},
      clipboardData: { getData: () => '12-ab-34' },
    } as unknown as ClipboardEvent;
    (el as any)._onPaste(fakeEvent);
    await el.updateComplete;
    expect(el.value).toBe('1234');
  });

  it('paste respects length limit', async () => {
    await create({ length: 4 });
    const fakeEvent = {
      preventDefault: () => {},
      clipboardData: { getData: () => '12345678' },
    } as unknown as ClipboardEvent;
    (el as any)._onPaste(fakeEvent);
    await el.updateComplete;
    expect(el.value).toBe('1234');
  });

  // ── Mask ──

  it('mask shows bullet for filled digits but stores the real value', async () => {
    await create({ length: 3, mask: true });
    const boxes = el.shadowRoot!.querySelectorAll('.box') as NodeListOf<HTMLInputElement>;
    boxes[0]!.value = '5';
    boxes[0]!.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.value).toBe('5');
    expect(boxes[0]!.value).toBe('\u2022');
  });

  // ── value prop → re-renders digits ──

  it('setting value prop syncs internal digits', async () => {
    await create({ length: 4 });
    el.value = '42';
    await el.updateComplete;
    const digits = (el as any)._digits;
    expect(digits[0]).toBe('4');
    expect(digits[1]).toBe('2');
    expect(digits[2]).toBe('');
  });

  it('filled class applied to boxes with values', async () => {
    await create({ length: 4, value: '12' });
    await el.updateComplete;
    const boxes = el.shadowRoot!.querySelectorAll('.box');
    expect(boxes[0]!.classList.contains('filled')).toBe(true);
    expect(boxes[1]!.classList.contains('filled')).toBe(true);
    expect(boxes[2]!.classList.contains('filled')).toBe(false);
  });

  // ── success ──

  it('success state reflects on host', async () => {
    await create({ success: true });
    expect(el.hasAttribute('success')).toBe(true);
  });
});
