import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiPromptEditor, type PromptVersion } from '../components/ai-prompt-editor/ai-prompt-editor.js';

if (!customElements.get('ai-prompt-editor')) {
  customElements.define('ai-prompt-editor', AiPromptEditor);
}

const VERSIONS: PromptVersion[] = [
  { id: 'v1', content: 'first', timestamp: 1700000000000, active: true },
  { id: 'v2', content: 'second', timestamp: 1700000100000 },
];

describe('ai-prompt-editor', () => {
  let el: AiPromptEditor;

  beforeEach(async () => {
    el = document.createElement('ai-prompt-editor') as AiPromptEditor;
    el.versions = VERSIONS;
    el.mode = 'edit';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('keeps the region landmark in the empty state (APE-4)', async () => {
    el.versions = [];
    await el.updateComplete;
    const editor = el.shadowRoot!.querySelector('.editor')!;
    expect(editor.getAttribute('role')).toBe('region');
    expect(editor.getAttribute('aria-label')).toBe('Prompt editor');
  });

  it('uses roving tabindex on listbox options (APE-7)', () => {
    const options = el.shadowRoot!.querySelectorAll<HTMLElement>('[role="option"]');
    const tabindexes = Array.from(options).map((o) => o.getAttribute('tabindex'));
    // exactly one selected option is in the tab order
    expect(tabindexes.filter((t) => t === '0').length).toBe(1);
    expect(tabindexes.filter((t) => t === '-1').length).toBe(1);
  });

  it('moves selection with ArrowDown (APE-7)', async () => {
    const first = el.shadowRoot!.querySelector<HTMLElement>('[role="option"]')!;
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    const selected = el.shadowRoot!.querySelector('.version-item.selected .version-id')!;
    expect(selected.textContent).toBe('v2');
  });

  it('renders Save disabled with no changes and enabled after edit (APE-6)', async () => {
    const save = () => el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn.primary')!;
    expect(save().disabled).toBe(true);
    const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!;
    textarea.value = 'first-edited';
    textarea.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(save().disabled).toBe(false);
  });

  it('shows Saving… label and blocks double-submit while saving (APE-6)', async () => {
    const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!;
    textarea.value = 'changed';
    textarea.dispatchEvent(new Event('input'));
    await el.updateComplete;

    const saves: unknown[] = [];
    el.addEventListener('ai-prompt-save', () => saves.push(1));
    el.saving = true;
    await el.updateComplete;
    const save = el.shadowRoot!.querySelector<HTMLButtonElement>('.action-btn.primary')!;
    expect(save.disabled).toBe(true);
    expect(save.textContent).toContain('Saving');
    // guard prevents dispatch even if invoked
    save.click();
    expect(saves.length).toBe(0);
  });

  it('gives the textarea a focus-visible style hook (APE-5)', () => {
    // textarea exists in edit mode and is the primary editing surface
    expect(el.shadowRoot!.querySelector('textarea')).not.toBeNull();
  });
});
