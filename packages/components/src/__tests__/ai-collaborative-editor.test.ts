import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiCollaborativeEditor } from '../components/ai-collaborative-editor/ai-collaborative-editor.js';

if (!customElements.get('ai-collaborative-editor')) {
  customElements.define('ai-collaborative-editor', AiCollaborativeEditor);
}

describe('ai-collaborative-editor', () => {
  let el: AiCollaborativeEditor;

  beforeEach(async () => {
    el = document.createElement('ai-collaborative-editor') as AiCollaborativeEditor;
    el.content = 'Hello world';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('exposes stats as a polite live region for screen readers (ace-3)', () => {
    const stats = el.shadowRoot!.querySelector('.stats')!;
    expect(stats.getAttribute('role')).toBe('status');
    expect(stats.getAttribute('aria-live')).toBe('polite');
    expect(stats.getAttribute('aria-label')).toBe('Document statistics');
  });

  it('uses readonly (not disabled) for non-editable content, keeping it focusable (ace-6)', async () => {
    el.editable = false;
    await el.updateComplete;
    const ta = el.shadowRoot!.querySelector('textarea')!;
    expect(ta.readOnly).toBe(true);
    expect(ta.disabled).toBe(false);
  });

  it('does not set a redundant tabindex on the natively-focusable textarea (ace-6)', () => {
    const ta = el.shadowRoot!.querySelector('textarea')!;
    expect(ta.hasAttribute('tabindex')).toBe(false);
  });

  it('has no dead textarea:hover border-color rule (ace-1)', () => {
    const cssText = (el.constructor as typeof AiCollaborativeEditor).styles
      .map(s => (s as { cssText?: string }).cssText ?? '')
      .join('\n');
    expect(cssText).not.toContain('textarea:hover');
  });

  it('uses tokenized opacity and the focus-ring token, no magic numbers (ace-2, ace-4)', () => {
    const cssText = (el.constructor as typeof AiCollaborativeEditor).styles
      .map(s => (s as { cssText?: string }).cssText ?? '')
      .join('\n');
    expect(cssText).toContain('opacity: var(--cg-opacity-50)');
    expect(cssText).toContain('var(--cg-color-focus-ring)');
    expect(cssText).not.toContain('opacity: 0.5');
  });

  it('recomputes char and word counts from content', async () => {
    el.content = 'one two three';
    await el.updateComplete;
    await el.updateComplete;
    const stats = el.shadowRoot!.querySelector('.stats')!.textContent!;
    expect(stats).toContain('13 chars');
    expect(stats).toContain('3 words');
  });
});
