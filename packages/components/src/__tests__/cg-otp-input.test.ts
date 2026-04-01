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
});
