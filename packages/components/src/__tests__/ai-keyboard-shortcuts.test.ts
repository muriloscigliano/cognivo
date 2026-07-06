import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { CSSResult } from 'lit';
import { AiKeyboardShortcuts } from '../components/ai-keyboard-shortcuts/ai-keyboard-shortcuts.js';

if (!customElements.get('ai-keyboard-shortcuts')) {
  customElements.define('ai-keyboard-shortcuts', AiKeyboardShortcuts);
}

const cssText = (AiKeyboardShortcuts.styles as CSSResult[]).map((s) => s.cssText).join('\n');

describe('ai-keyboard-shortcuts', () => {
  let el: AiKeyboardShortcuts;

  beforeEach(async () => {
    el = document.createElement('ai-keyboard-shortcuts') as AiKeyboardShortcuts;
    el.shortcuts = [
      { keys: ['Ctrl', 'K'], description: 'Open search', category: 'Navigation' },
      { keys: ['Esc'], description: 'Close', category: 'Navigation' },
    ];
    el.open = true;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders the close icon via an SVG-namespaced element (not invisible)', () => {
    const svg = el.shadowRoot!.querySelector('.close-btn svg');
    expect(svg).not.toBeNull();
    // Lit svg`` template yields the correct SVG namespace
    expect(svg!.namespaceURI).toBe('http://www.w3.org/2000/svg');
  });

  it('uses tokens for focus outline width, letter-spacing, and modal width (no raw px)', () => {
    expect(cssText).toContain('outline: var(--cg-outline-width-default) solid var(--cg-color-focus-ring)');
    expect(cssText).toContain('letter-spacing: var(--cg-letter-spacing-wide)');
    expect(cssText).toContain('max-width: var(--cg-component-modal-width-md)');
    expect(cssText).not.toMatch(/outline:\s*2px/);
    expect(cssText).not.toContain('letter-spacing: 0.5px');
    expect(cssText).not.toContain('max-width: 520px');
  });

  it('has a hover state on shortcut rows', () => {
    expect(cssText).toContain('.shortcut-row:hover');
  });

  it('does not apply list/listitem roles to the shortcut structure', () => {
    expect(el.shadowRoot!.querySelector('[role="list"]')).toBeNull();
    expect(el.shadowRoot!.querySelector('[role="listitem"]')).toBeNull();
  });

  it('moves focus into the modal when opened', async () => {
    const input = el.shadowRoot!.querySelector('.search-input');
    expect(el.shadowRoot!.activeElement).toBe(input);
  });

  it('closes on Escape and fires ai-shortcuts-close', async () => {
    let closed = false;
    el.addEventListener('ai-shortcuts-close', () => { closed = true; });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;
    expect(closed).toBe(true);
    expect(el.open).toBe(false);
  });
});
