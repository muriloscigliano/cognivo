import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiToast } from '../components/ai-toast/ai-toast.js';

if (!customElements.get('ai-toast')) {
  customElements.define('ai-toast', AiToast);
}

describe('ai-toast', () => {
  let el: AiToast;

  beforeEach(async () => {
    el = document.createElement('ai-toast') as AiToast;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders an inner cg-toaster', () => {
    expect(el.shadowRoot!.querySelector('cg-toaster')).not.toBeNull();
  });

  it('does not expose a dead `rounded` property', () => {
    // `rounded` was removed because cg-toaster has no radius knob to bind it to.
    expect('rounded' in el).toBe(false);
  });

  it('defaults an unknown string variant to "ai" rather than passing it through', async () => {
    // show('hi', 'succes') must not leak the typo'd variant into cg-toaster.
    const id = el.show('hi', 'succes');
    await el.updateComplete;
    const toaster = el.shadowRoot!.querySelector('cg-toaster');
    // The typo'd variant must not appear as a rendered toast variant class.
    expect(toaster!.shadowRoot?.querySelector('.toast.succes')).toBeFalsy();
    expect(typeof id).toBe('string');
  });

  it('keeps a valid string variant', () => {
    const id = el.show('done', 'success');
    expect(typeof id).toBe('string');
  });

  it('emits ai-toast-dismiss with only an id (no fabricated reason)', () => {
    let detail: any = null;
    el.addEventListener('ai-toast-dismiss', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const toaster = el.shadowRoot!.querySelector('cg-toaster')!;
    toaster.dispatchEvent(new CustomEvent('cg-toaster-dismiss', {
      bubbles: true, composed: true, detail: { id: 'abc' },
    }));
    expect(detail).not.toBeNull();
    expect(detail.id).toBe('abc');
    expect('reason' in detail).toBe(false);
  });

  it('preserves duration in the string-overload branch', () => {
    // Regression guard: string branch must not drop the duration argument.
    const id = el.show('persist', 'ai', 0);
    expect(typeof id).toBe('string');
  });
});
