import { describe, it, expect, afterEach } from 'vitest';
import {
  AiValidationChecklist,
  type ValidationCheck,
} from '../components/ai-validation-checklist/ai-validation-checklist.js';

if (!customElements.get('ai-validation-checklist')) {
  customElements.define('ai-validation-checklist', AiValidationChecklist);
}

async function mount(checks: ValidationCheck[] = []): Promise<AiValidationChecklist> {
  const element = document.createElement('ai-validation-checklist') as AiValidationChecklist;
  element.checks = checks;
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('ai-validation-checklist', () => {
  afterEach(() => {
    document.body.querySelectorAll('ai-validation-checklist').forEach((el) => el.remove());
  });

  it('F1/F2/F9: no surface tokens misused as text/fill and no stale accent cssprop', () => {
    const styleText = (AiValidationChecklist.styles as { cssText: string }[])
      .map((s) => s.cssText).join('\n');
    // run-btn text uses the on-primary text token
    expect(styleText).toContain('color: var(--cg-color-action-primary-text-default)');
    // hover uses the real card hover-fill token, not the border token
    expect(styleText).toContain('var(--cg-color-surface-cards-hover-background)');
    expect(styleText).not.toContain('background: var(--cg-color-surface-cards-border)');
  });

  it('F6: interactive elements have an :active pressed state', () => {
    const styleText = (AiValidationChecklist.styles as { cssText: string }[])
      .map((s) => s.cssText).join('\n');
    expect(styleText).toContain('.check-item:active');
    expect(styleText).toContain('var(--cg-color-surface-cards-active-background)');
    expect(styleText).toContain('.run-btn:active:not(:disabled)');
  });

  it('F5: the running status icon carries an aria-label', async () => {
    const el = await mount([{ id: '1', label: 'Loading', status: 'running' }]);
    const icon = el.shadowRoot!.querySelector('.status-icon.running')!;
    expect(icon.getAttribute('aria-label')).toBe('Running');
  });

  it('F7: check rows are role=button with a descriptive aria-label', async () => {
    const el = await mount([{ id: '1', label: 'Schema valid', status: 'pass' }]);
    const row = el.shadowRoot!.querySelector('.check-item')!;
    expect(row.getAttribute('role')).toBe('button');
    expect(row.getAttribute('aria-label')).toBe('Schema valid, pass');
    expect(row.getAttribute('tabindex')).toBe('0');
    // redundant native list roles dropped
    expect(el.shadowRoot!.querySelector('.check-list')!.getAttribute('role')).toBeNull();
  });

  it('F8: empty checks render an empty-state message and no list', async () => {
    const el = await mount([]);
    expect(el.shadowRoot!.querySelector('.empty-state')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.empty-state')!.textContent).toContain('No validations configured');
    expect(el.shadowRoot!.querySelector('.check-list')).toBeNull();
  });

  it('F10: summary shows a remaining tally accounting for pending/skipped items', async () => {
    const el = await mount([
      { id: '1', label: 'A', status: 'pass' },
      { id: '2', label: 'B', status: 'pending' },
      { id: '3', label: 'C', status: 'skipped' },
    ]);
    const labels = Array.from(el.shadowRoot!.querySelectorAll('.summary-label')).map(
      (n) => n.textContent,
    );
    expect(labels).toContain('remaining');
    const remainingItem = Array.from(el.shadowRoot!.querySelectorAll('.summary-item')).find((it) =>
      it.textContent?.includes('remaining'),
    )!;
    // pending + skipped = 2 unaccounted
    expect(remainingItem.querySelector('.summary-count')!.textContent).toBe('2');
  });

  it('F10: fully-passed checklist hides the remaining tally', async () => {
    const el = await mount([
      { id: '1', label: 'A', status: 'pass' },
      { id: '2', label: 'B', status: 'pass' },
    ]);
    const labels = Array.from(el.shadowRoot!.querySelectorAll('.summary-label')).map(
      (n) => n.textContent,
    );
    expect(labels).not.toContain('remaining');
  });
});
