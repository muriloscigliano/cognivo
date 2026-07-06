import { describe, it, expect, afterEach } from 'vitest';
import { AiDataPreview } from '../components/ai-data-preview/ai-data-preview.js';

if (!customElements.get('ai-data-preview')) {
  customElements.define('ai-data-preview', AiDataPreview);
}

async function mount(props: Partial<AiDataPreview> = {}): Promise<AiDataPreview> {
  const element = document.createElement('ai-data-preview') as AiDataPreview;
  Object.assign(element, { data: [{ name: 'Alice', score: 92 }], ...props });
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-data-preview', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-data-preview').forEach((el) => el.remove());
  });

  it('disables Confirm and suppresses the event when data is null (adp-7)', async () => {
    const el = await mount({ data: null });
    const confirm = el.shadowRoot!.querySelector('.btn-confirm') as HTMLButtonElement;
    expect(confirm.disabled).toBe(true);

    let fired = false;
    el.addEventListener('ai-data-confirm', () => { fired = true; });
    confirm.click(); // programmatic click bypasses ?disabled
    expect(fired).toBe(false);
  });

  it('keeps Confirm enabled and firing for valid data (adp-7)', async () => {
    const el = await mount({ data: [{ a: 1 }] });
    const confirm = el.shadowRoot!.querySelector('.btn-confirm') as HTMLButtonElement;
    expect(confirm.disabled).toBe(false);

    let detail: unknown = null;
    el.addEventListener('ai-data-confirm', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    confirm.click();
    expect(detail).toEqual({ data: [{ a: 1 }], format: 'json' });
  });

  it('ties the preview region to the dynamic title via aria-labelledby (adp-8)', async () => {
    const el = await mount({ title: 'Training Data' });
    const title = el.shadowRoot!.querySelector('.title');
    const region = el.shadowRoot!.querySelector('.preview-area');
    expect(title?.id).toBe('adp-title');
    expect(region?.getAttribute('aria-labelledby')).toBe('adp-title');
    expect(region?.hasAttribute('aria-label')).toBe(false);
    expect(title?.textContent).toContain('Training Data');
  });

  it('uses system focus-ring + governed hover tokens, not overlays/magic numbers (adp-1/2/4/5)', async () => {
    const styles = (AiDataPreview as typeof AiDataPreview).styles as Array<{ cssText?: string }>;
    const cssText = styles.map((s) => s.cssText ?? '').join('\n');
    expect(cssText).toContain('--cg-color-surface-table-row-hover-background');
    expect(cssText).toContain('--cg-color-focus-ring');
    expect(cssText).toContain('--cg-color-action-primary-background-hover');
    expect(cssText).not.toContain('filter: brightness');
    expect(cssText).not.toContain('--cg-overlay-accent-strong');
  });

  it('colors JSON booleans with a code-syntax token, not a status token (adp-6)', async () => {
    const styles = (AiDataPreview as typeof AiDataPreview).styles as Array<{ cssText?: string }>;
    const cssText = styles.map((s) => s.cssText ?? '').join('\n');
    expect(cssText).toContain('.json-bool { color: var(--cg-color-code-keyword); }');
  });
});
