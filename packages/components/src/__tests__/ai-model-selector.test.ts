import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { CSSResult } from 'lit';
import { AiModelSelector, type AIModel } from '../components/ai-model-selector/ai-model-selector.js';

if (!customElements.get('ai-model-selector')) {
  customElements.define('ai-model-selector', AiModelSelector);
}

const cssText = (AiModelSelector.styles as CSSResult[]).map((s) => s.cssText).join('\n');

const MODELS: AIModel[] = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', capabilities: ['vision'] },
  { id: 'claude', name: 'Claude', provider: 'Anthropic', capabilities: ['vision'] },
  { id: 'legacy', name: 'Legacy', provider: 'Old', disabled: true },
];

describe('ai-model-selector', () => {
  let el: AiModelSelector;

  beforeEach(async () => {
    el = document.createElement('ai-model-selector') as AiModelSelector;
    el.models = MODELS;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('uses role="option" for cards inside the listbox (valid ARIA nesting)', () => {
    const listbox = el.shadowRoot!.querySelector('[role="listbox"]')!;
    expect(listbox).not.toBeNull();
    const cards = el.shadowRoot!.querySelectorAll('.model-card');
    expect(cards.length).toBe(3);
    cards.forEach((c) => expect(c.getAttribute('role')).toBe('option'));
    expect(el.shadowRoot!.querySelector('[role="radio"], [role="checkbox"]')).toBeNull();
  });

  it('implements roving tabindex — exactly one card is tabbable', () => {
    const cards = Array.from(el.shadowRoot!.querySelectorAll('.model-card'));
    const tabbable = cards.filter((c) => c.getAttribute('tabindex') === '0');
    expect(tabbable.length).toBe(1);
    // disabled card is removed from tab order
    const disabled = el.shadowRoot!.querySelector('[aria-disabled="true"]')!;
    expect(disabled.getAttribute('tabindex')).toBe('-1');
  });

  it('writes selection back to the selected prop in single mode', async () => {
    (el.shadowRoot!.querySelectorAll('.model-card')[0] as HTMLElement).click();
    await el.updateComplete;
    expect(el.selected).toBe('gpt-4');
  });

  it('clears internal selection when selected is set to empty', async () => {
    el.selected = 'gpt-4';
    await el.updateComplete;
    await el.updateComplete; // _selectedIds set in updated() schedules a follow-up render
    expect(el.shadowRoot!.querySelector('.model-card.selected')).not.toBeNull();
    el.selected = '';
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.model-card.selected')).toBeNull();
  });

  it('does not select a disabled model', async () => {
    let fired = false;
    el.addEventListener('ai-model-select', () => { fired = true; });
    (el.shadowRoot!.querySelectorAll('.model-card')[2] as HTMLElement).click();
    await el.updateComplete;
    expect(fired).toBe(false);
    expect(el.selected).toBe('');
  });

  it('has no dead --cg-badge-font-size rule and marks the check indicator aria-hidden', async () => {
    expect(cssText).not.toContain('--cg-badge-font-size');
    el.selected = 'gpt-4';
    await el.updateComplete;
    await el.updateComplete; // _selectedIds set in updated() schedules a follow-up render
    expect(el.shadowRoot!.querySelector('.check')!.getAttribute('aria-hidden')).toBe('true');
  });
});
