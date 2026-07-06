/**
 * Focused tests for <ai-file-upload>, covering the audit fixes:
 * the AI prompt renders as the dropzone placeholder body text (F1),
 * and error/success/variant/etc. now pass through to cg-file-input (F2).
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiFileUpload } from '../components/ai-file-upload/ai-file-upload.js';

if (!customElements.get('ai-file-upload')) {
  customElements.define('ai-file-upload', AiFileUpload);
}

describe('ai-file-upload', () => {
  let element: AiFileUpload;

  beforeEach(async () => {
    element = document.createElement('ai-file-upload') as AiFileUpload;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  const child = () => element.shadowRoot!.querySelector('cg-file-input') as HTMLElement & Record<string, unknown>;

  it('binds the AI prompt to the dropzone placeholder (F1)', async () => {
    element.label = 'Drop training data here';
    await element.updateComplete;
    expect(child().getAttribute('placeholder')).toBe('Drop training data here');
  });

  it('forwards error and success visual states (F2)', async () => {
    element.error = true;
    element.success = true;
    await element.updateComplete;
    expect(child().hasAttribute('error')).toBe(true);
    expect(child().hasAttribute('success')).toBe(true);
  });

  it('forwards variant, size, helper and max-files (F2)', async () => {
    element.variant = 'compact';
    element.size = 'lg';
    element.helper = 'CSV only';
    element.maxFiles = 3;
    await element.updateComplete;
    const c = child();
    expect(c.getAttribute('variant')).toBe('compact');
    expect(c.getAttribute('size')).toBe('lg');
    expect(c.getAttribute('helper')).toBe('CSV only');
    expect(c.getAttribute('max-files')).toBe('3');
  });

  it('re-dispatches cg-file-change as ai-file-select', async () => {
    const files = [new File(['x'], 'a.csv')];
    let received: File[] | undefined;
    element.addEventListener('ai-file-select', (e) => {
      received = (e as CustomEvent).detail.files;
    });
    child().dispatchEvent(new CustomEvent('cg-file-change', { detail: { files }, bubbles: true }));
    expect(received).toEqual(files);
  });

  it('re-dispatches cg-file-reject as ai-file-error with reason mapped to error', async () => {
    let detail: { error: string; files: File[] } | undefined;
    element.addEventListener('ai-file-error', (e) => {
      detail = (e as CustomEvent).detail;
    });
    child().dispatchEvent(
      new CustomEvent('cg-file-reject', { detail: { files: [], reason: 'too big' }, bubbles: true }),
    );
    expect(detail?.error).toBe('too big');
  });

  it('reflects the disabled state to the underlying input', async () => {
    element.disabled = true;
    await element.updateComplete;
    expect(child().hasAttribute('disabled')).toBe(true);
  });
});
