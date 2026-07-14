import { describe, it, expect, afterEach } from 'vitest';
import { AiActionReceipt } from '../components/ai-action-receipt/ai-action-receipt.js';

if (!customElements.get('ai-action-receipt')) {
  customElements.define('ai-action-receipt', AiActionReceipt);
}

async function fixture(setup?: (el: AiActionReceipt) => void): Promise<AiActionReceipt> {
  const el = document.createElement('ai-action-receipt') as AiActionReceipt;
  setup?.(el);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('ai-action-receipt', () => {
  afterEach(() => {
    document.querySelectorAll('ai-action-receipt').forEach((n) => n.remove());
  });

  it('renders the summary and the entities it touched', async () => {
    const el = await fixture((e) => {
      e.summary = 'Create invoice INV-1';
      e.touched = ['INV-1'];
      e.status = 'executed';
    });
    const text = el.shadowRoot!.textContent ?? '';
    expect(text).toContain('Create invoice INV-1');
    expect(text).toContain('INV-1');
  });

  it('shows a keyboard-focusable compensation button when a compensation exists', async () => {
    const el = await fixture((e) => {
      e.summary = 'Create invoice INV-1';
      e.compensationLabel = 'Void invoice';
      e.status = 'executed';
    });
    const btn = el.shadowRoot!.querySelector('button.compensate') as HTMLButtonElement | null;
    expect(btn).not.toBeNull();
    expect(btn!.textContent).toContain('Void invoice');
    // Prove focusability the way sibling components do (this repo's test env is
    // happy-dom, which reports tabIndex === -1 for a plain native <button> even
    // though it IS focusable — so assert real focus, not the tabIndex number).
    btn!.focus();
    expect(el.shadowRoot!.activeElement).toBe(btn);
  });

  it('fires ai-action-compensate when the compensation button is clicked', async () => {
    const el = await fixture((e) => {
      e.summary = 's';
      e.compensationLabel = 'Void invoice';
      e.status = 'executed';
    });
    let fired = false;
    el.addEventListener('ai-action-compensate', () => { fired = true; });
    (el.shadowRoot!.querySelector('button.compensate') as HTMLButtonElement).click();
    expect(fired).toBe(true);
  });

  it('renders NO compensation button when there is no compensation label', async () => {
    const el = await fixture((e) => { e.summary = 's'; e.status = 'executed'; });
    expect(el.shadowRoot!.querySelector('button.compensate')).toBeNull();
  });

  it('labels status with TEXT, not color alone (WCAG 1.4.1)', async () => {
    const el = await fixture((e) => { e.summary = 's'; e.status = 'failed'; e.error = 'gateway down'; });
    const text = el.shadowRoot!.textContent ?? '';
    // a screen-reader user must be able to tell it failed without seeing color
    expect(text.toLowerCase()).toContain('failed');
    expect(text).toContain('gateway down');
  });

  it('makes clear a compensation is not a destructive undo', async () => {
    const el = await fixture((e) => {
      e.summary = 's';
      e.compensationLabel = 'Void invoice';
      e.status = 'executed';
    });
    const text = (el.shadowRoot!.textContent ?? '').toLowerCase();
    // copy must not promise the action never happened
    expect(text).not.toContain('undo everything');
  });
});
