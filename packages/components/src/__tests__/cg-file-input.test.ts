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

  // ── File handling ──

  function makeFile(name: string, size: number): File {
    const blob = new Blob(['x'.repeat(size)], { type: 'text/plain' });
    return new File([blob], name, { type: 'text/plain' });
  }

  it('_addFiles adds a single file and emits cg-file-change', async () => {
    await create();
    const fileList = [makeFile('a.txt', 100)];
    let detail: any;
    el.addEventListener('cg-file-change', (e: any) => (detail = e.detail));
    (el as any)._addFiles(fileList);
    expect(detail.files.length).toBe(1);
    expect(detail.files[0].name).toBe('a.txt');
  });

  it('_addFiles in single-select mode replaces existing files', async () => {
    await create({ multiple: false });
    (el as any)._addFiles([makeFile('a.txt', 100)]);
    (el as any)._addFiles([makeFile('b.txt', 200)]);
    const files = (el as any)._files;
    expect(files.length).toBe(1);
    expect(files[0].name).toBe('b.txt');
  });

  it('_addFiles in multiple mode appends', async () => {
    await create({ multiple: true });
    (el as any)._addFiles([makeFile('a.txt', 100)]);
    (el as any)._addFiles([makeFile('b.txt', 200)]);
    const files = (el as any)._files;
    expect(files.length).toBe(2);
  });

  it('maxSize rejects large files and emits cg-file-reject', async () => {
    await create({ maxSize: 500 });
    let rejectDetail: any;
    el.addEventListener('cg-file-reject', (e: any) => (rejectDetail = e.detail));
    (el as any)._addFiles([makeFile('big.txt', 1000), makeFile('small.txt', 100)]);
    expect(rejectDetail.files.length).toBe(1);
    expect(rejectDetail.files[0].name).toBe('big.txt');
    expect(rejectDetail.reason).toContain('exceeds');
  });

  it('maxFiles limits total files in multiple mode', async () => {
    await create({ multiple: true, maxFiles: 2 });
    let rejectDetail: any;
    el.addEventListener('cg-file-reject', (e: any) => (rejectDetail = e.detail));
    (el as any)._addFiles([makeFile('a.txt', 10), makeFile('b.txt', 10), makeFile('c.txt', 10)]);
    expect((el as any)._files.length).toBe(2);
    expect(rejectDetail.files.length).toBe(1);
    expect(rejectDetail.reason).toContain('Maximum');
  });

  it('_removeFile removes by index and emits cg-file-remove + cg-file-change', async () => {
    await create({ multiple: true });
    (el as any)._addFiles([makeFile('a.txt', 10), makeFile('b.txt', 20)]);
    let removedFile: any;
    let changeFiles: any;
    el.addEventListener('cg-file-remove', (e: any) => (removedFile = e.detail.file));
    el.addEventListener('cg-file-change', (e: any) => (changeFiles = e.detail.files));
    (el as any)._removeFile(0);
    expect(removedFile.name).toBe('a.txt');
    expect(changeFiles.length).toBe(1);
  });

  it('_removeFile with invalid index is a no-op', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-file-remove', () => (fired = true));
    (el as any)._removeFile(99);
    expect(fired).toBe(false);
  });

  it('_formatSize handles bytes, KB, MB', () => {
    el = document.createElement('cg-file-input') as CgFileInput;
    expect((el as any)._formatSize(500)).toBe('500 B');
    expect((el as any)._formatSize(2048)).toBe('2.0 KB');
    expect((el as any)._formatSize(2 * 1024 * 1024)).toBe('2.00 MB');
  });

  // ── Drag behavior ──

  it('dragenter sets _dragging true', async () => {
    await create();
    const ev = new Event('dragenter', { cancelable: true }) as DragEvent;
    (el as any)._handleDragEnter(ev);
    expect((el as any)._dragging).toBe(true);
  });

  it('dragleave with matching counter clears _dragging', async () => {
    await create();
    (el as any)._handleDragEnter(new Event('dragenter', { cancelable: true }) as DragEvent);
    (el as any)._handleDragLeave();
    expect((el as any)._dragging).toBe(false);
  });

  it('dragenter when disabled does not set _dragging', async () => {
    await create({ disabled: true });
    (el as any)._handleDragEnter(new Event('dragenter', { cancelable: true }) as DragEvent);
    expect((el as any)._dragging).toBe(false);
  });

  it('drop clears _dragging even when files are rejected by disabled', async () => {
    await create({ disabled: true });
    (el as any)._dragging = true;
    const ev = {
      preventDefault: () => {},
      dataTransfer: { files: [] },
    } as unknown as DragEvent;
    (el as any)._handleDrop(ev);
    expect((el as any)._dragging).toBe(false);
  });

  it('_handleChange reads files from input element', async () => {
    await create();
    let detail: any;
    el.addEventListener('cg-file-change', (e: any) => (detail = e.detail));
    const ev = { target: { files: [makeFile('x.txt', 50)] } } as unknown as Event;
    (el as any)._handleChange(ev);
    expect(detail.files.length).toBe(1);
  });

  it('_handleKeydown Enter triggers the file input click', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
    let clicked = false;
    input.click = () => { clicked = true; };
    (el as any)._handleKeydown(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    expect(clicked).toBe(true);
  });

  it('_handleKeydown Space triggers the file input click', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
    let clicked = false;
    input.click = () => { clicked = true; };
    (el as any)._handleKeydown(new KeyboardEvent('keydown', { key: ' ', cancelable: true }));
    expect(clicked).toBe(true);
  });

  it('_handleKeydown ignored when disabled', async () => {
    await create({ disabled: true });
    const input = el.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
    let clicked = false;
    input.click = () => { clicked = true; };
    (el as any)._handleKeydown(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    expect(clicked).toBe(false);
  });

  it('click handler opens file picker when not disabled', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
    let clicked = false;
    input.click = () => { clicked = true; };
    (el as any)._handleClick();
    expect(clicked).toBe(true);
  });

  it('click is a no-op when disabled', async () => {
    await create({ disabled: true });
    const input = el.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
    let clicked = false;
    input.click = () => { clicked = true; };
    (el as any)._handleClick();
    expect(clicked).toBe(false);
  });

  it('renders file chips after files are added', async () => {
    await create({ multiple: true });
    (el as any)._addFiles([makeFile('a.txt', 50), makeFile('b.txt', 75)]);
    await el.updateComplete;
    const fileEls = el.shadowRoot!.querySelectorAll('.file');
    expect(fileEls.length).toBe(2);
  });

  it('helper text renders when set', async () => {
    await create({ helper: 'Any text' });
    expect(el.shadowRoot!.querySelector('.helper')?.textContent).toContain('Any text');
  });

  it('subtitle shows accept when set', async () => {
    await create({ accept: '.pdf' });
    expect(el.shadowRoot!.textContent).toContain('Accepted:');
  });

  it('subtitle shows max size when set', async () => {
    await create({ maxSize: 1024 });
    expect(el.shadowRoot!.textContent).toContain('Max size:');
  });
});
