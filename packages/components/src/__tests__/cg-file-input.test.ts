import { describe, it, expect, afterEach } from 'vitest';
import { CgFileInput } from '../components/cg-file-input/cg-file-input.js';

if (!customElements.get('cg-file-input')) {
  customElements.define('cg-file-input', CgFileInput);
}

describe('cg-file-input', () => {
  let el: CgFileInput;

  async function create(props?: Partial<CgFileInput>): Promise<CgFileInput> {
    el = document.createElement('cg-file-input') as CgFileInput;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.dropzone')).not.toBeNull();
  });

  it('has native file input', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input[type="file"]');
    expect(input).not.toBeNull();
  });

  it('dropzone has role="button"', async () => {
    await create();
    const d = el.shadowRoot!.querySelector('.dropzone')!;
    expect(d.getAttribute('role')).toBe('button');
  });

  it('renders label when set', async () => {
    await create({ label: 'Upload' });
    const l = el.shadowRoot!.querySelector('label')!;
    expect(l.textContent).toBe('Upload');
  });

  it('passes accept to native input', async () => {
    await create({ accept: '.pdf,.png' });
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="file"]')!;
    expect(input.accept).toBe('.pdf,.png');
  });

  it('multiple prop applies to native input', async () => {
    await create({ multiple: true });
    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="file"]')!;
    expect(input.multiple).toBe(true);
  });

  it('disabled reflects to attribute', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('error reflects to attribute', async () => {
    await create({ error: true });
    expect(el.hasAttribute('error')).toBe(true);
  });

  it('renders placeholder text', async () => {
    await create({ placeholder: 'Drop files here' });
    const title = el.shadowRoot!.querySelector('.title')!;
    expect(title.textContent).toBe('Drop files here');
  });

  it('is form-associated', () => {
    expect((CgFileInput as any).formAssociated).toBe(true);
  });
});
