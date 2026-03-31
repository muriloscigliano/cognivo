import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CgTextarea } from '../components/cg-textarea/cg-textarea.js';

// Register the custom element if not already registered
if (!customElements.get('cg-textarea')) {
  customElements.define('cg-textarea', CgTextarea);
}

describe('cg-textarea', () => {
  let el: CgTextarea;

  beforeEach(async () => {
    el = document.createElement('cg-textarea') as CgTextarea;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it('renders with shadow DOM', () => {
    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  it('has a textarea element in shadow DOM', () => {
    const textarea = el.shadowRoot!.querySelector('textarea');
    expect(textarea).not.toBeNull();
  });

  it('accepts value property', async () => {
    el.value = 'Hello world';
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('Hello world');
  });

  it('dispatches cg-input on input', async () => {
    let detail: { value: string } | null = null;
    el.addEventListener('cg-input', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = 'typed text';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(detail).not.toBeNull();
    expect(detail!.value).toBe('typed text');
  });

  it('error state applies error attribute', async () => {
    el.error = true;
    await el.updateComplete;

    expect(el.hasAttribute('error')).toBe(true);
  });

  it('error state border exists in styles', () => {
    const styles = CgTextarea.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('error');
    expect(cssText).toContain('cg-text-danger');
  });

  it('success state applies success attribute', async () => {
    el.success = true;
    await el.updateComplete;

    expect(el.hasAttribute('success')).toBe(true);
  });

  it('success state border exists in styles', () => {
    const styles = CgTextarea.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('success');
    expect(cssText).toContain('cg-color-input-icon-success');
  });

  it('disabled prevents input', async () => {
    el.disabled = true;
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });

  it('disabled attribute reflects', async () => {
    el.disabled = true;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('readonly prevents modification', async () => {
    el.readonly = true;
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.readOnly).toBe(true);
  });

  it('maxlength shows character count', async () => {
    el.maxlength = 100;
    el.value = 'Hello';
    await el.updateComplete;

    const count = el.shadowRoot!.querySelector('.count');
    expect(count).not.toBeNull();
    expect(count!.textContent).toBe('5/100');
  });

  it('maxlength of 0 hides character count', () => {
    const count = el.shadowRoot!.querySelector('.count');
    expect(count).toBeNull();
  });

  it('maxlength attribute is set on textarea', async () => {
    el.maxlength = 200;
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.getAttribute('maxlength')).toBe('200');
  });

  it('autoresize attribute reflects', async () => {
    el.autoresize = true;
    await el.updateComplete;
    expect(el.hasAttribute('autoresize')).toBe(true);
  });

  it('autoresize exists in styles (resize: none)', () => {
    const styles = CgTextarea.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('autoresize');
    expect(cssText).toContain('resize: none');
  });

  it('default size is md', () => {
    expect(el.size).toBe('md');
  });

  it('size variant sm reflects', async () => {
    el.size = 'sm';
    await el.updateComplete;
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('size variant lg reflects', async () => {
    el.size = 'lg';
    await el.updateComplete;
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('size variants exist in styles', () => {
    const styles = CgTextarea.styles;
    const cssText = Array.isArray(styles)
      ? styles.map(s => s.cssText).join('')
      : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('size="sm"');
    expect(cssText).toContain('size="lg"');
  });

  it('placeholder renders', async () => {
    el.placeholder = 'Type here...';
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.getAttribute('placeholder')).toBe('Type here...');
  });

  it('aria-invalid is "true" on error', async () => {
    el.error = true;
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
  });

  it('aria-invalid is "false" by default', () => {
    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.getAttribute('aria-invalid')).toBe('false');
  });

  it('rows property sets textarea rows', async () => {
    el.rows = 6;
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.getAttribute('rows')).toBe('6');
  });

  it('value updates on programmatic set', async () => {
    el.value = 'first';
    await el.updateComplete;
    expect(el.value).toBe('first');

    el.value = 'second';
    await el.updateComplete;

    const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('second');
  });
});
